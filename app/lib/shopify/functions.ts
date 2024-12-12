import { shopifyFetch } from "@/lib/shopify"
import { sortFilterSlugToKey } from "@/lib/shopify/constants"
import {
   collectionByHandleGraphQLQuery,
   listCollectionProductsGraphQLQuery,
   listCollectionsGraphQLQuery,
} from "@/lib/shopify/queries/collection"
import { menuByHandleGraphQLQuery } from "@/lib/shopify/queries/menu"
import {
   listPagesGraphQLQuery,
   pageByHandleGraphQLQuery,
} from "@/lib/shopify/queries/page"
import {
   listProductRecommendationsGraphQLQuery,
   listProductsGraphQLQuery,
   productByHandleGraphQLQuery,
} from "@/lib/shopify/queries/product"
import {
   listCollectionProductsParams,
   listProductsParams,
} from "@/lib/shopify/schema"
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

export const collectionByHandle = createServerFn({ method: "GET" })
   .validator(zodValidator(z.object({ handle: z.string() })))
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: collectionByHandleGraphQLQuery,
         variables: {
            handle: data.handle,
         },
      })) as {
         collection: ShopifyCollection
      }

      return reshapeCollection(res.collection)
   })

export const listCollections = createServerFn({ method: "GET" }).handler(
   async () => {
      const res = (await shopifyFetch({
         query: listCollectionsGraphQLQuery,
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

export const listCollectionProducts = createServerFn({ method: "GET" })
   .validator(zodValidator(listCollectionProductsParams))
   .handler(async ({ data }) => {
      const sort = data.sort ? sortFilterSlugToKey[data.sort] : undefined
      const res = (await shopifyFetch({
         query: listCollectionProductsGraphQLQuery,
         variables: {
            handle: data.collection,
            reverse: data.reverse,
            sortKey: sort === "CREATED_AT" ? "CREATED" : sort,
         },
      })) as {
         collection: {
            products: Connection<ShopifyProduct>
         }
      }

      if (!res.collection) return []

      return reshapeProducts(removeEdgesAndNodes(res.collection.products))
   })

export const menuByHandle = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: menuByHandleGraphQLQuery,
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

export const pageByHandle = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: pageByHandleGraphQLQuery,
         variables: { handle: data.handle },
      })) as { pageByHandle: Page }

      return res.pageByHandle
   })

export const listPages = createServerFn({ method: "GET" }).handler(async () => {
   const res = (await shopifyFetch({
      query: listPagesGraphQLQuery,
   })) as {
      pages: Connection<Page>
   }

   return removeEdgesAndNodes(res.pages)
})

export const productByHandle = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: productByHandleGraphQLQuery,
         variables: {
            handle: data.handle,
         },
      })) as { product: ShopifyProduct }

      return (
         reshapeProduct({
            product: res.product,
            filterHidden: false,
         }) ?? null
      )
   })

export const listProductRecommendations = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            productId: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: listProductRecommendationsGraphQLQuery,
         variables: {
            productId: data.productId,
         },
      })) as {
         productRecommendations: ShopifyProduct[]
      }

      return reshapeProducts(res.productRecommendations)
   })

export const listProducts = createServerFn({ method: "GET" })
   .validator(zodValidator(listProductsParams))
   .handler(async ({ data: { q, reverse, sort, colors, sizes, style } }) => {
      let queryString = q ?? ""

      if (colors && colors.length > 0) {
         const colorQuery = colors.join(" OR ")
         queryString += ` AND (variants.options:color:(${colorQuery}))`
      }

      if (sizes && sizes.length > 0) {
         const sizeQuery = sizes.join(" OR ")
         queryString += ` AND (variants.options:size:(${sizeQuery}))`
      }

      if (style) queryString += ` AND product_type:${style}`

      const res = (await shopifyFetch({
         query: listProductsGraphQLQuery,
         variables: {
            query: queryString,
            sortKey: sort ? sortFilterSlugToKey[sort] : undefined,
            reverse,
            first: 100,
         },
      })) as {
         products: Connection<ShopifyProduct>
      }

      return reshapeProducts(removeEdgesAndNodes(res.products))
   })
