import { AddToCart } from "@/app/product/[handle]/_components/add-to-cart"
import { Gallery } from "@/app/product/[handle]/_components/gallery"
import { VariantSelector } from "@/app/product/[handle]/_components/variant-selector"
import { Button } from "@/components/ui/button"
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants"
import { getProduct } from "@/lib/shopify"
import type { Image as ShopifyImage } from "@/lib/shopify/types"
import { formatCurrency } from "@/lib/utils"
import { HeartIcon, TruckIcon } from "@heroicons/react/24/outline"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateMetadata({
   params,
}: {
   params: { handle: string }
}): Promise<Metadata> {
   const product = await getProduct(decodeURI(params.handle))

   if (!product) return notFound()

   const { url, width, height, altText: alt } = product.featuredImage || {}
   const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG)

   return {
      title: product.seo.title || product.title,
      description: product.seo.description || product.description,
      robots: {
         index: indexable,
         follow: indexable,
         googleBot: {
            index: indexable,
            follow: indexable,
         },
      },
      openGraph: url
         ? {
              images: [
                 {
                    url,
                    width,
                    height,
                    alt,
                 },
              ],
           }
         : null,
   }
}

export default async function Page({ params }: { params: { handle: string } }) {
   const product = await getProduct(decodeURI(params.handle))

   if (!product) return notFound()

   // const relatedProducts = await getProductRecommendations(product.id)

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
         <div className="container grid gap-4 lg:grid-cols-[52%,_1fr] lg:gap-14 xl:gap-24">
            <Suspense
               fallback={
                  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
               }
            >
               <Gallery
                  images={product.images.map((image: ShopifyImage) => ({
                     src: image.url,
                     altText: image.altText,
                  }))}
               />
            </Suspense>
            <Suspense fallback={null}>
               <div className="flex flex-col">
                  <div className="flex flex-col">
                     <h1 className="mb-2 font-semibold text-2xl lg:text-3xl">
                        {product.title}
                     </h1>
                     <p className="text-foreground/70 lg:mt-2 ">42 відгуки</p>
                     <p className="mt-4 font-bold text-2xl lg:mt-8 lg:text-[2.25rem]">
                        ₴
                        {formatCurrency(
                           product.priceRange.maxVariantPrice.amount,
                        )}
                     </p>
                  </div>
                  <hr className="my-5 lg:my-8" />
                  <div className="mb-6 lg:mb-8">
                     <VariantSelector
                        options={product.options}
                        variants={product.variants}
                     />
                  </div>
                  <div className="mt-auto flex w-full items-center gap-2.5 lg:gap-4">
                     <AddToCart product={product} />
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
                     <TruckIcon className="-mt-0.5 size-6" /> Безкоштовна
                     доставка від суми більше ніж ₴1000
                  </p>
               </div>
            </Suspense>
         </div>
      </>
   )
}
