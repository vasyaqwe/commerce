import {
   collectionByHandleGraphQLQuery,
   listCollectionProductsGraphQLQuery,
   listCollectionsGraphQLQuery,
} from "@/collection/queries"
import { listCollectionProductsParams } from "@/collection/schema"
import type { ShopifyCollection } from "@/collection/types"
import { reshapeCollection, reshapeCollections } from "@/collection/utils"
import { sortFilterSlugToKey } from "@/filter/constants"
import { shopifyFetch } from "@/lib/shopify"
import type { Connection } from "@/lib/shopify/types"
import { removeEdgesAndNodes } from "@/lib/shopify/utils"
import type { ShopifyProduct } from "@/product/types"
import { reshapeProducts } from "@/product/utils"
import { createServerFn } from "@tanstack/start"
import { zodValidator } from "@tanstack/zod-adapter"
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
            sortKey: sort === "CREATED_AT" ? "CREATED" : sort,
            productType: data.productTypes[0],
            reverse: data.reverse,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
         },
      })) as {
         collection: {
            products: Connection<ShopifyProduct>
         }
      }

      if (!res.collection) return []

      return reshapeProducts(removeEdgesAndNodes(res.collection.products))
   })
