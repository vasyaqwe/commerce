import { HIDDEN_PRODUCT_TAG } from "@/lib/shopify/constants"
import { productByHandle } from "@/lib/shopify/functions"
import { Button } from "@/ui/components/button"
import { cn } from "@/ui/utils"
import { formatCurrency } from "@/utils/format"
import { HeartIcon, TruckIcon } from "@heroicons/react/24/outline"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, notFound } from "@tanstack/react-router"
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
      const title =
         product?.seo.title ?? product?.title ?? "Сторінку не знайдено"
      const description =
         product?.seo.description ??
         product?.description ??
         "Ця сторінка не більше існує — можливо вона переїхала, або її видалили."

      const { url, width, height, altText: alt } = product?.featuredImage || {}
      const indexable = !product?.tags.includes(HIDDEN_PRODUCT_TAG)

      const robotsContent = indexable ? "index, follow" : "noindex, nofollow"

      const googleBotContent = indexable ? "index, follow" : "noindex, nofollow"

      return {
         meta: [
            { title },
            {
               name: "description",
               content: description,
            },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description },
            { name: "og:type", content: "website" },
            { name: "og:title", content: title },
            { name: "og:description", content: description },
            url ? { name: "og:image", content: url } : undefined,
            url && width
               ? { name: "og:image:width", content: String(width) }
               : undefined,
            url && height
               ? { name: "og:image:height", content: String(height) }
               : undefined,
            url && alt ? { name: "og:image:alt", content: alt } : undefined,
            { name: "twitter:card", content: "summary_large_image" },
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

   if (!product) return null

   const productJsonLd = {
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
         priceCurrency: product.priceRange.minVariantPrice.currencyCode,
         highPrice: product.priceRange.maxVariantPrice.amount,
         lowPrice: product.priceRange.minVariantPrice.amount,
      },
   }

   return (
      <>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(productJsonLd),
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
                  {/* <VariantSelector
                     options={product.options}
                     variants={product.variants}
                  /> */}
               </div>
               <div className="mt-auto flex w-full items-center gap-2.5 lg:gap-4">
                  {/* <AddToCart product={product} /> */}
                  <Button
                     aria-label="Favorite"
                     className="size-12 shrink-0 lg:size-[3.75rem] lg:rounded-2xl"
                     variant={"secondary"}
                     size={"icon"}
                  >
                     <HeartIcon
                        className="size-6"
                        strokeWidth={2}
                     />
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
            console.log(containerWidth, imagesWidth)
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
                                 "size-20 shrink-0 overflow-hidden rounded-xl border border-transparent ring-[2px] ring-transparent transition-all duration-200 hover:border-accent/90 hover:ring-accent/40 lg:ring-[3px]",
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
