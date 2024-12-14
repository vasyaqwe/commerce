import { sortFilterSlugToKey } from "@/filter/constants"
import { shopifyFetch } from "@/lib/shopify"
import type { Connection } from "@/lib/shopify/types"
import { removeEdgesAndNodes } from "@/lib/shopify/utils"
import {
   listProductRecommendationsGraphQLQuery,
   listProductsGraphQLQuery,
   productByHandleGraphQLQuery,
} from "@/product/queries"
import { listProductsParams } from "@/product/schema"
import type { ShopifyProduct } from "@/product/types"
import { reshapeProduct, reshapeProducts } from "@/product/utils"
import { createServerFn } from "@tanstack/start"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"

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
   .handler(
      async ({
         data: { q, reverse, sort, colors, sizes, minPrice, maxPrice },
      }) => {
         let queryString = q ?? ""

         if (colors.length > 0) {
            const colorQuery = colors.join(" OR ")
            queryString += ` AND (variants.options:color:(${colorQuery}))`
         }

         if (sizes.length > 0) {
            const sizeQuery = sizes.join(" OR ")
            queryString += ` AND (variants.options:size:(${sizeQuery}))`
         }

         // if (style) queryString += ` AND product_type:${style}`
         queryString += ` AND variants.price:>=${minPrice}`
         queryString += ` AND variants.price:<=${maxPrice}`

         const res = (await shopifyFetch({
            query: listProductsGraphQLQuery,
            variables: {
               query: queryString,
               sortKey: sortFilterSlugToKey[sort],
               reverse,
               first: 100,
            },
         })) as {
            products: Connection<ShopifyProduct>
         }

         return reshapeProducts(removeEdgesAndNodes(res.products))
      },
   )
