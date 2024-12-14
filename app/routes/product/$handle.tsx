import { useAddCartItem } from "@/cart/hooks/use-add-cart-item"
import { useDeleteFavorite } from "@/favorites/hooks/use-delete-favorite"
import { useInsertFavorite } from "@/favorites/hooks/use-insert-favorite"
import { listFavoriteIdsQuery } from "@/favorites/queries"
import { HIDDEN_PRODUCT_TAG } from "@/lib/shopify/constants"
import { productByHandle } from "@/lib/shopify/functions"
import type {
   Product,
   ProductOption,
   ProductVariant,
} from "@/lib/shopify/types"
import { Button } from "@/ui/components/button"
import { Chip } from "@/ui/components/chip"
import { Tooltip } from "@/ui/components/tooltip"
import { cn } from "@/ui/utils"
import { formatCurrency } from "@/utils/format"
import { seo } from "@/utils/seo"
import {
   HeartIcon as HeartIconOutline,
   ShoppingBagIcon,
   TruckIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid"
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import {
   createFileRoute,
   notFound,
   useNavigate,
   useSearch,
} from "@tanstack/react-router"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useRef, useState } from "react"

const productByHandleQuery = ({ handle }: { handle: string }) =>
   queryOptions({
      queryKey: ["product_by_handle", handle],
      queryFn: () => productByHandle({ data: { handle } }),
   })

export const Route = createFileRoute("/product/$handle")({
   component: RouteComponent,
   loader: async ({ context, params }) => {
      const product = await context.queryClient.ensureQueryData(
         productByHandleQuery({
            handle: params.handle,
         }),
      )

      if (!product) throw notFound()

      return product
   },
   head: ({ loaderData: product }) => {
      const title = product?.seo.title ?? product?.title
      const description = product?.seo.description ?? product?.description

      const { url, width, height, altText: alt } = product?.featuredImage || {}
      const indexable = !product?.tags.includes(HIDDEN_PRODUCT_TAG)

      const robotsContent = indexable ? "index, follow" : "noindex, nofollow"
      const googleBotContent = indexable ? "index, follow" : "noindex, nofollow"

      return {
         meta: [
            ...seo({
               title,
               description,
               image: url,
            }),
            url && width
               ? { name: "og:image:width", content: String(width) }
               : undefined,
            url && height
               ? { name: "og:image:height", content: String(height) }
               : undefined,
            url && alt ? { name: "og:image:alt", content: alt } : undefined,
            { name: "robots", content: robotsContent },
            { name: "googlebot", content: googleBotContent },
         ],
      }
   },
})

function RouteComponent() {
   const params = Route.useParams()
   const query = useSuspenseQuery(
      productByHandleQuery({
         handle: params.handle,
      }),
   )
   const product = query.data

   const { insertFavorite } = useInsertFavorite()
   const { deleteFavorite } = useDeleteFavorite()
   const favoriteIds = useQuery(listFavoriteIdsQuery())

   if (!product) return null

   return (
      <>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  name: product.title,
                  description: product.description,
                  image: product.featuredImage.url,
                  offers: {
                     "@type": "AggregateOffer",
                     availability: product.availableForSale
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock",
                     priceCurrency:
                        product.priceRange.minVariantPrice.currencyCode,
                     highPrice: product.priceRange.maxVariantPrice.amount,
                     lowPrice: product.priceRange.minVariantPrice.amount,
                  },
               }),
            }}
         />
         <div className="container grid gap-4 lg:mt-12 lg:grid-cols-2 lg:gap-14 xl:gap-24 max-lg:px-0">
            <Gallery
               images={product.images.map((image) => ({
                  src: image.url,
                  altText: image.altText,
               }))}
            />
            <div className="flex flex-col max-lg:px-4">
               <div className="flex flex-col">
                  <h1 className="mb-2 font-semibold text-2xl lg:text-3xl">
                     {product.title}
                  </h1>
                  {/* <p className="text-foreground/70 lg:mt-2 ">42 відгуки</p> */}
                  <p className="mt-4 font-bold text-2xl lg:mt-8 lg:text-[2.25rem]">
                     {formatCurrency(product.priceRange.maxVariantPrice.amount)}
                  </p>
               </div>
               <hr className="my-5 border-border lg:my-8" />
               <div className="mb-6 lg:mb-8">
                  <VariantSelector
                     options={product.options}
                     variants={product.variants}
                  />
               </div>
               <div className="mt-auto flex w-full items-center gap-2.5 lg:gap-4">
                  <AddToCartButton product={product} />
                  <Button
                     aria-label={
                        favoriteIds.data?.includes(product.id)
                           ? "Видалити із збережених"
                           : "Зберегти"
                     }
                     className="size-12 shrink-0 lg:size-[3.75rem] lg:rounded-2xl"
                     variant={"secondary"}
                     size={"icon"}
                     onClick={() => {
                        if (favoriteIds.data?.includes(product.id))
                           return deleteFavorite.mutate(product.id)

                        insertFavorite.mutate(product.id)
                     }}
                  >
                     {favoriteIds.data?.includes(product.id) ? (
                        <HeartIconSolid className="size-6" />
                     ) : (
                        <HeartIconOutline
                           className="size-6"
                           strokeWidth={2}
                        />
                     )}
                  </Button>
               </div>
               <p className="mt-5 flex items-center gap-2 font-medium text-sm lg:mt-8">
                  <TruckIcon className="-mt-0.5 size-6" /> Безкоштовна доставка
                  від суми більше ніж ₴1000
               </p>
            </div>
         </div>
      </>
   )
}

function Gallery({ images }: { images: { src: string; altText: string }[] }) {
   const [emblaRef, emblaApi] = useEmblaCarousel()
   const [carouselActive, setCarouselActive] = useState(false)
   const [emblaRef2] = useEmblaCarousel({
      dragFree: true,
      active: carouselActive,
   })
   const [selectedIndex, setSelectedIndex] = useState(0)
   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const check = () => {
         if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth
            const imagesWidth = images.length * 80 + images.length
            setCarouselActive(containerWidth < imagesWidth)
         }
      }

      check()
      window.addEventListener("resize", check)

      return () => window.removeEventListener("resize", check)
   }, [images])

   useEffect(() => {
      if (emblaApi) {
         const handleSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
         }
         emblaApi.on("select", handleSelect)
         return () => {
            emblaApi.off("select", handleSelect)
         }
      }
   }, [emblaApi])

   return (
      <div className="overflow-hidden">
         <div
            className="relative aspect-square max-h-[60svh] w-full overflow-hidden rounded-2xl max-lg:rounded-t-none"
            ref={emblaRef}
         >
            <div className="flex h-full">
               {images.map((image, idx) => (
                  <div
                     key={image.src}
                     className="relative size-full flex-[0_0_100%] active:cursor-grabbing"
                  >
                     <img
                        className="size-full object-cover object-top"
                        alt={image.altText as string}
                        src={image.src as string}
                        loading={idx === 0 ? "eager" : "lazy"}
                     />
                  </div>
               ))}
            </div>
         </div>
         <div
            ref={containerRef}
            className=""
         >
            {images.length > 1 ? (
               <div
                  ref={emblaRef2}
                  className="relative isolate overflow-hidden after:pointer-events-none before:pointer-events-none after:absolute before:absolute after:inset-y-0 before:inset-y-0 after:right-0 before:left-0 after:z-10 before:z-10 after:w-10 before:w-10 after:bg-gradient-to-l before:bg-gradient-to-r after:from-background before:from-background after:to-transparent before:to-transparent"
               >
                  <div className="flex items-center gap-1 px-1 py-1 lg:gap-2 lg:py-2">
                     {images.map((image, idx) => {
                        return (
                           <button
                              key={image.src}
                              onClick={() => {
                                 emblaApi?.scrollTo(idx)
                              }}
                              aria-label="Select product image"
                              className={cn(
                                 "size-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent ring-[2px] ring-transparent transition-all duration-200 hover:border-accent/90 hover:ring-accent/40 lg:ring-[3px]",
                                 selectedIndex === idx
                                    ? "border-accent/90 ring-accent/40"
                                    : "",
                              )}
                           >
                              <img
                                 draggable={false}
                                 alt={image.altText}
                                 src={image.src}
                                 width={120}
                                 height={120}
                              />
                           </button>
                        )
                     })}
                  </div>
               </div>
            ) : null}
         </div>
      </div>
   )
}

type Combination = {
   id: string
   availableForSale: boolean
   [key: string]: string | boolean
}

function VariantSelector({
   options,
   variants,
}: {
   options: ProductOption[]
   variants: ProductVariant[]
}) {
   const params = Route.useParams()
   const search = useSearch({ strict: false })
   const navigate = useNavigate({ from: Route.fullPath })
   const hasNoOptionsOrJustOneOption =
      !options.length ||
      (options.length === 1 && options[0]?.values.length === 1)

   if (hasNoOptionsOrJustOneOption) {
      return null
   }

   const combinations: Combination[] = variants.map((variant) => ({
      id: variant.id,
      availableForSale: variant.availableForSale,
      ...variant.selectedOptions.reduce(
         (accumulator, option) => ({
            // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
            ...accumulator,
            [option.name.toLowerCase()]: option.value,
         }),
         {},
      ),
   }))

   return (
      <div className="space-y-6">
         {options.map((option) => (
            <div key={option.id}>
               <dl className="">
                  <dt className="mb-3 font-medium text-sm tracking-wide">
                     {option.name}
                  </dt>
                  <dd className="flex flex-wrap gap-3">
                     {option.values.map((value) => {
                        const optionNameLowerCase = option.name.toLowerCase()

                        // Base option params on current selectedOptions so we can preserve any other param state.
                        const optionParams = {
                           ...search,
                           [optionNameLowerCase]: value,
                        }

                        // Filter out invalid options and check if the option combination is available for sale.
                        const filtered = Object.entries(optionParams).filter(
                           ([key, value]) =>
                              options.find(
                                 (option) =>
                                    option.name.toLowerCase() === key &&
                                    option.values.includes(value as never),
                              ),
                        )
                        const isAvailableForSale = combinations.find(
                           (combination) =>
                              filtered.every(
                                 ([key, value]) =>
                                    combination[key] === value &&
                                    combination.availableForSale,
                              ),
                        )

                        const isActive =
                           search[optionNameLowerCase as never] === value

                        const Component = (
                           <Chip
                              key={value}
                              name={option.name}
                              onChange={() => {
                                 navigate({
                                    params: { handle: params.handle },
                                    resetScroll: false,
                                    replace: true,
                                    search: {
                                       ...search,
                                       [optionNameLowerCase]: value,
                                    },
                                 })
                              }}
                              checked={isActive}
                              disabled={!isAvailableForSale}
                           >
                              {value}
                           </Chip>
                        )

                        return !isAvailableForSale ? (
                           <Tooltip
                              delayDuration={0}
                              content={
                                 <span>
                                    Немає в наявності{" "}
                                    {/* <span
                                       className={cn(
                                          option.name !== "Розмір"
                                             ? "lowercase"
                                             : "",
                                       )}
                                    >
                                       ({value} {option.name})
                                    </span> */}
                                 </span>
                              }
                              key={value}
                           >
                              <span>{Component}</span>
                           </Tooltip>
                        ) : (
                           Component
                        )
                     })}
                  </dd>
               </dl>
            </div>
         ))}
      </div>
   )
}

function AddToCartButton({ product }: { product: Product }) {
   const { variants, availableForSale } = product
   const { addItem } = useAddCartItem()

   const search = useSearch({ strict: false })

   const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
         (option) =>
            option.value === search[option.name.toLowerCase() as never],
      ),
   )
   const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
   const selectedVariantId = variant?.id || defaultVariantId
   const finalVariant = variants.find(
      (variant) => variant.id === selectedVariantId,
   )

   return (
      <Button
         disabled={!availableForSale || !selectedVariantId}
         className="h-12 w-full flex-1 gap-3 text-[1rem] lg:h-[3.75rem] lg:rounded-2xl lg:text-lg"
         aria-label="Add to cart"
         onClick={() => {
            if (!finalVariant) return

            addItem.mutate({ variant: finalVariant, product })
         }}
      >
         <ShoppingBagIcon
            className="-mt-0.5 size-5 lg:size-6"
            strokeWidth={2}
         />
         Додати до кошика
      </Button>
   )
}
