import { shopifyFetch } from "@/lib/shopify"
import {
   getCollectionProductsQuery,
   getCollectionQuery,
   getCollectionsQuery,
} from "@/lib/shopify/queries/collection"
import { getMenuQuery } from "@/lib/shopify/queries/menu"
import { getPageQuery, getPagesQuery } from "@/lib/shopify/queries/page"
import {
   getProductQuery,
   getProductRecommendationsQuery,
   getProductsQuery,
} from "@/lib/shopify/queries/product"
import type {
   Connection,
   Page,
   ShopifyCollection,
   ShopifyProduct,
} from "@/lib/shopify/types"
import {
   removeEdgesAndNodes,
   reshapeCollection,
   reshapeCollections,
   reshapeProduct,
   reshapeProducts,
} from "@/lib/shopify/utils"
import { createServerFn } from "@tanstack/start"
import { zodValidator } from "@tanstack/zod-adapter"
import { getEvent } from "vinxi/http"
import { z } from "zod"

export const getCollection = createServerFn({ method: "GET" })
   .validator(zodValidator(z.object({ handle: z.string() })))
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: getCollectionQuery,
         variables: {
            handle: data.handle,
         },
      })) as {
         collection: ShopifyCollection
      }

      return reshapeCollection(res.collection)
   })

export const getCollections = createServerFn({ method: "GET" }).handler(
   async () => {
      const res = (await shopifyFetch({
         query: getCollectionsQuery,
      })) as {
         collections: Connection<ShopifyCollection>
      }

      const shopifyCollections = removeEdgesAndNodes(res?.collections)

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
   },
)

export const getCollectionProducts = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            collection: z.string(),
            reverse: z.boolean().optional(),
            sortKey: z.string().optional(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: getCollectionProductsQuery,
         variables: {
            handle: data.collection,
            reverse: data.reverse,
            sortKey: data.sortKey === "CREATED_AT" ? "CREATED" : data.sortKey,
         },
      })) as {
         collection: {
            products: Connection<ShopifyProduct>
         }
      }

      if (!res.collection) return []

      return reshapeProducts(removeEdgesAndNodes(res.collection.products))
   })

export const getMenu = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: getMenuQuery,
         variables: {
            handle: data.handle,
         },
      })) as {
         menu?: {
            items: {
               title: string
               url: string
            }[]
         }
      }

      const env = getEvent().context.cloudflare.env

      return (
         res?.menu?.items.map((item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url
               .replace(`https://${env.SHOPIFY_STORE_DOMAIN}`, "")
               .replace("/collections", "/search")
               .replace("/pages", ""),
         })) || []
      )
   })

export const getPage = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: getPageQuery,
         variables: { handle: data.handle },
      })) as { pageByHandle: Page }

      return res.pageByHandle
   })

export const getPages = createServerFn({ method: "GET" }).handler(async () => {
   const res = (await shopifyFetch({
      query: getPagesQuery,
   })) as {
      pages: Connection<Page>
   }

   return removeEdgesAndNodes(res.pages)
})

export const getProduct = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: getProductQuery,
         variables: {
            handle: data.handle,
         },
      })) as { product: ShopifyProduct }

      return reshapeProduct({
         product: res.product,
         filterHidden: false,
      })
   })

export const getProductRecommendations = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            productId: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: getProductRecommendationsQuery,
         variables: {
            productId: data.productId,
         },
      })) as {
         productRecommendations: ShopifyProduct[]
      }

      return reshapeProducts(res.productRecommendations)
   })

export const getProducts = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            query: z.string().optional(),
            reverse: z.boolean().optional(),
            sortKey: z.string().optional(),
            colors: z.array(z.string()).optional(),
            sizes: z.array(z.string()).optional(),
            style: z.string().optional(),
         }),
      ),
   )
   .handler(
      async ({ data: { query, reverse, sortKey, colors, sizes, style } }) => {
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

         const res = (await shopifyFetch({
            query: getProductsQuery,
            variables,
         })) as {
            products: Connection<ShopifyProduct>
         }

         return reshapeProducts(removeEdgesAndNodes(res.products))
      },
   )
