import {
   collectionByHandle,
   listCollectionProducts,
} from "@/collection/functions"
import type { listCollectionProductsParams } from "@/collection/schema"
import { sortFilterSlugToReverse } from "@/filter/constants"
import { Product } from "@/product/components/product"
import { ProductsGrid } from "@/product/components/products-grid"
import { ProductsPending } from "@/product/components/products-pending"
import { seo } from "@/seo/utils"
import {
   FeedbackState,
   FeedbackStateDescription,
   FeedbackStateIcon,
} from "@/ui/components/feedback-state"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, notFound, useSearch } from "@tanstack/react-router"
import * as React from "react"
import type { z } from "zod"

const collectionByHandleQuery = ({ handle }: { handle: string }) =>
   queryOptions({
      queryKey: ["collection_by_handle", handle],
      queryFn: () => collectionByHandle({ data: { handle } }),
   })
const listCollectionProductsQuery = (
   data: z.infer<typeof listCollectionProductsParams>,
) =>
   queryOptions({
      queryKey: [
         "list_collection_products",
         data.sort,
         data.productTypes,
         data.reverse,
         data.minPrice,
         data.maxPrice,
         data.collection,
      ],
      queryFn: () => listCollectionProducts({ data }),
   })

export const Route = createFileRoute("/search/_layout/$collection")({
   component: RouteComponent,
   pendingComponent: ProductsPending,
   loaderDeps: ({ search }) => ({ search }),
   loader: async ({ deps: { search }, params, context }) => {
      context.queryClient.prefetchQuery(
         listCollectionProductsQuery({
            sort: search.sort,
            productTypes: search.product_types,
            reverse: sortFilterSlugToReverse[search.sort],
            minPrice: search.min_price,
            maxPrice: search.max_price,
            collection: params.collection,
         }),
      )

      const collection = await context.queryClient.ensureQueryData(
         collectionByHandleQuery({
            handle: params.collection,
         }),
      )
      if (!collection) throw notFound()

      return collection
   },
   head: ({ loaderData: collection }) => {
      const title = collection?.seo?.title ?? collection?.title
      const description =
         collection?.seo?.description ?? collection?.description

      return {
         meta: [
            ...seo({
               title,
               description,
            }),
         ],
      }
   },
})

function RouteComponent() {
   const params = Route.useParams()
   // defer to avoid showing pendingComponent when search changes
   const search = React.useDeferredValue(useSearch({ from: "/search/_layout" }))
   const query = useSuspenseQuery(
      listCollectionProductsQuery({
         sort: search.sort,
         productTypes: search.product_types,
         reverse: sortFilterSlugToReverse[search.sort],
         minPrice: search.min_price,
         maxPrice: search.max_price,
         collection: params.collection,
      }),
   )
   const products = query.data

   return (
      <>
         {products.length === 0 ? (
            <FeedbackState>
               <FeedbackStateIcon>
                  <InformationCircleIcon
                     className="size-12 text-foreground/50"
                     strokeWidth={2}
                  />
               </FeedbackStateIcon>
               <FeedbackStateDescription className="mb-5">
                  Не знайдено жодного товару.
               </FeedbackStateDescription>
            </FeedbackState>
         ) : (
            <ProductsGrid>
               {products.map((p) => (
                  <Product
                     product={p}
                     key={p.handle}
                  />
               ))}
            </ProductsGrid>
         )}
      </>
   )
}
