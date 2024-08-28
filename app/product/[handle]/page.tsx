import { Gallery } from "@/components/product/gallery"
import { ProductProvider } from "@/components/product/product-context"
import { ProductDescription } from "@/components/product/product-description"
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants"
import { getProduct } from "@/lib/shopify"
import type { Image as ShopifyImage } from "@/lib/shopify/types"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export async function generateMetadata({
   params,
}: {
   params: { handle: string }
}): Promise<Metadata> {
   const product = await getProduct(decodeURIComponent(params.handle))

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

export default async function ProductPage({
   params,
}: { params: { handle: string } }) {
   const product = await getProduct(params.handle)

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
      <ProductProvider>
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(productJsonLd),
            }}
         />
         <div className="container grid gap-4 lg:grid-cols-[52%,1fr] lg:gap-14 xl:gap-24">
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
               <ProductDescription product={product} />
            </Suspense>
         </div>
      </ProductProvider>
   )
}
