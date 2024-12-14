import { HIDDEN_PRODUCT_TAG } from "@/lib/shopify/constants"
import type { Connection, Image } from "@/lib/shopify/types"
import { removeEdgesAndNodes } from "@/lib/shopify/utils"
import type { ShopifyProduct } from "@/product/types"

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
   const flattened = removeEdgesAndNodes(images)

   return flattened.map((image) => {
      const filename = image.url.match(/.*\/(.*)\..*/)?.[1]
      return {
         ...image,
         altText: image.altText || `${productTitle} - ${filename}`,
      }
   })
}

export const reshapeProduct = ({
   product,
   filterHidden = true,
}: {
   product: ShopifyProduct
   filterHidden?: boolean
}) => {
   if (
      !product ||
      (filterHidden && product.tags.includes(HIDDEN_PRODUCT_TAG))
   ) {
      return undefined
   }

   const { images, variants, ...rest } = product

   return {
      ...rest,
      images: reshapeImages(images, product.title),
      variants: removeEdgesAndNodes(variants),
   }
}

export const reshapeProducts = (products: ShopifyProduct[]) => {
   const reshapedProducts = []

   for (const product of products) {
      if (product) {
         const reshapedProduct = reshapeProduct({ product })

         if (reshapedProduct) {
            reshapedProducts.push(reshapedProduct)
         }
      }
   }

   return reshapedProducts
}
