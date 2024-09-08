import {
   isShopifyError,
   removeEdgesAndNodes,
   reshapeCollection,
   reshapeCollections,
   reshapeProduct,
   reshapeProducts,
} from "@/lib/shopify/utils"
import {
   getCollectionProductsQuery,
   getCollectionQuery,
   getCollectionsQuery,
} from "./queries/collection"
import { getMenuQuery } from "./queries/menu"
import { getPageQuery, getPagesQuery } from "./queries/page"
import {
   getProductQuery,
   getProductRecommendationsQuery,
   getProductsQuery,
} from "./queries/product"
import type {
   Collection,
   Menu,
   Page,
   Product,
   ShopifyCollectionOperation,
   ShopifyCollectionProductsOperation,
   ShopifyCollectionsOperation,
   ShopifyMenuOperation,
   ShopifyPageOperation,
   ShopifyPagesOperation,
   ShopifyProductOperation,
   ShopifyProductRecommendationsOperation,
   ShopifyProductsOperation,
} from "./types"

export const DEFAULT_PRODUCT_TITLE = "Default Title"
export const HIDDEN_PRODUCT_TAG = "hidden"

export const TAGS = {
   collections: "collections",
   products: "products",
   cart: "cart",
}

const domain = `https://${process.env.SHOPIFY_STORE_DOMAIN}`

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
      const result = await fetch(`${domain}/api/2024-10/graphql.json`, {
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
      })

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

export const getCollection = async (
   handle: string,
): Promise<Collection | undefined> => {
   const res = await shopifyFetch<ShopifyCollectionOperation>({
      query: getCollectionQuery,
      tags: [TAGS.collections],
      variables: {
         handle,
      },
   })

   return reshapeCollection(res.body.data.collection)
}

export const getCollectionProducts = async ({
   collection,
   reverse,
   sortKey,
}: {
   collection: string
   reverse?: boolean
   sortKey?: string
}): Promise<Product[]> => {
   const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
      query: getCollectionProductsQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: {
         handle: collection,
         reverse,
         sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
      },
   })

   if (!res.body.data.collection) return []

   return reshapeProducts(
      removeEdgesAndNodes(res.body.data.collection.products),
   )
}

export const getCollections = async (): Promise<Collection[]> => {
   const res = await shopifyFetch<ShopifyCollectionsOperation>({
      query: getCollectionsQuery,
      tags: [TAGS.collections],
   })

   const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections)

   const collections = [
      {
         handle: "",
         title: "All",
         description: "All products",
         seo: {
            title: "All",
            description: "All products",
         },
         path: "/search",
         updatedAt: new Date().toISOString(),
      },
      // Filter out the `hidden` collections.
      // Collections that start with `hidden-*` need to be hidden on the search page.
      ...reshapeCollections(shopifyCollections).filter(
         (collection) => !collection.handle.startsWith("hidden"),
      ),
   ]

   return collections
}

export const getMenu = async (handle: string): Promise<Menu[]> => {
   const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      tags: [TAGS.collections],
      variables: {
         handle,
      },
   })

   return (
      res.body?.data?.menu?.items.map(
         (item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url
               .replace(domain, "")
               .replace("/collections", "/search")
               .replace("/pages", ""),
         }),
      ) || []
   )
}

export const getPage = async (handle: string): Promise<Page> => {
   const res = await shopifyFetch<ShopifyPageOperation>({
      query: getPageQuery,
      cache: "no-store",
      variables: { handle },
   })

   return res.body.data.pageByHandle
}

export const getPages = async (): Promise<Page[]> => {
   const res = await shopifyFetch<ShopifyPagesOperation>({
      query: getPagesQuery,
      cache: "no-store",
   })

   return removeEdgesAndNodes(res.body.data.pages)
}

export const getProduct = async (
   handle: string,
): Promise<Product | undefined> => {
   const res = await shopifyFetch<ShopifyProductOperation>({
      query: getProductQuery,
      tags: [TAGS.products],
      variables: {
         handle,
      },
   })

   return reshapeProduct({
      product: res.body.data.product,
      filterHidden: false,
   })
}

export const getProductRecommendations = async (
   productId: string,
): Promise<Product[]> => {
   const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
      query: getProductRecommendationsQuery,
      tags: [TAGS.products],
      variables: {
         productId,
      },
   })

   return reshapeProducts(res.body.data.productRecommendations)
}

export const getProducts = async ({
   query,
   reverse,
   sortKey,
   colors,
   sizes,
   style,
}: {
   query?: string
   reverse?: boolean
   sortKey?: string
   colors?: string[] // Accept an array of colors
   sizes?: string[]
   style?: string
}): Promise<Product[]> => {
   let queryString = query || ""

   if (colors && colors.length > 0) {
      const colorQuery = colors.join(" OR ")
      queryString += ` AND (variants.options:color:(${colorQuery}))`
   }

   if (sizes && sizes.length > 0) {
      const sizeQuery = sizes.join(" OR ")
      queryString += ` AND (variants.options:size:(${sizeQuery}))`
   }

   if (style) queryString += ` AND product_type:${style}`

   const variables = {
      query: queryString,
      sortKey,
      reverse,
      first: 100,
   }

   const res = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      tags: [TAGS.products],
      variables,
   })

   return reshapeProducts(removeEdgesAndNodes(res.body.data.products))
}
