import { HIDDEN_PRODUCT_TAG, SHOPIFY_BASE_URL } from "@/lib/shopify/constants"
import type {
   Collection,
   Connection,
   Image,
   ShopifyCollection,
   ShopifyProduct,
} from "@/lib/shopify/types"

type ExtractVariables<T> = T extends { variables: object }
   ? T["variables"]
   : never

export const shopifyFetch = async <T>({
   // cache = "force-cache",
   headers,
   query,
   tags,
   variables,
}: {
   cache?: RequestCache
   headers?: HeadersInit
   query: string
   tags?: string[]
   variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T } | never> => {
   try {
      const result = await fetch(
         `${SHOPIFY_BASE_URL}/api/2024-10/graphql.json`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "X-Shopify-Storefront-Access-Token":
                  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "",
               ...headers,
            },
            cache: "no-store",
            body: JSON.stringify({
               ...(query && { query }),
               ...(variables && { variables }),
            }),
            ...(tags && { next: { tags } }),
         },
      )

      const body = await result.json()

      if (body.errors) throw body.errors[0]

      return {
         status: result.status,
         body,
      }
   } catch (e) {
      if (isShopifyError(e)) {
         throw {
            cause: e.cause?.toString() || "unknown",
            status: e.status || 500,
            message: e.message,
            query,
         }
      }

      throw {
         error: e,
         query,
      }
   }
}

export const removeEdgesAndNodes = <T>(array: Connection<T>): T[] =>
   array.edges.map((edge) => edge?.node)

export const reshapeCollection = (
   collection: ShopifyCollection,
): Collection | undefined => {
   if (!collection) return undefined

   return {
      ...collection,
      path: `/search/${collection.handle}`,
   }
}

export const reshapeCollections = (collections: ShopifyCollection[]) => {
   const reshapedCollections = []

   for (const collection of collections) {
      if (collection) {
         const reshapedCollection = reshapeCollection(collection)

         if (reshapedCollection) {
            reshapedCollections.push(reshapedCollection)
         }
      }
   }

   return reshapedCollections
}

export const reshapeImages = (
   images: Connection<Image>,
   productTitle: string,
) => {
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

const findError = <T extends object>(error: T): boolean => {
   if (Object.prototype.toString.call(error) === "[object Error]") {
      return true
   }

   const prototype = Object.getPrototypeOf(error) as T | null

   return prototype === null ? false : findError(prototype)
}

const isObject = (object: unknown): object is Record<string, unknown> =>
   typeof object === "object" && object !== null && !Array.isArray(object)

export const isShopifyError = (
   error: unknown,
): error is {
   status: number
   message: Error
   cause?: Error
} => {
   if (!isObject(error)) return false

   if (error instanceof Error) return true

   return findError(error)
}
