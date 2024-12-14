import { shopifyFetch } from "@/lib/shopify"
import { listFavoriteProductsGraphQLQuery } from "@/lib/shopify/queries/product"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { reshapeProducts } from "@/lib/shopify/utils"
import { createServerFn } from "@tanstack/start"
import { zodValidator } from "@tanstack/zod-adapter"
import { z } from "zod"

export const listFavoriteProducts = createServerFn({ method: "GET" })
   .validator(zodValidator(z.object({ ids: z.array(z.string()) })))
   .handler(async ({ data: { ids } }) => {
      const res = (await shopifyFetch({
         query: listFavoriteProductsGraphQLQuery,
         variables: {
            ids,
         },
      })) as {
         nodes: ShopifyProduct[]
      }
      return reshapeProducts(res.nodes)
   })
