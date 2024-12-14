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
import { Card } from "@/ui/components/card"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, notFound, useSearch } from "@tanstack/react-router"
import { useDeferredValue } from "react"
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
      queryKey: ["list_collection_products", { ...data }],
      queryFn: () => listCollectionProducts({ data }),
   })

export const Route = createFileRoute("/search/_layout/$collection")({
   component: RouteComponent,
   pendingComponent: ProductsPending,
   loaderDeps: ({ search }) => ({ search }),
   loader: async ({ deps: { search }, params, context }) => {
      const collection = await context.queryClient.ensureQueryData(
         collectionByHandleQuery({
            handle: params.collection,
         }),
      )
      if (!collection) throw notFound()

      context.queryClient.prefetchQuery(
         listCollectionProductsQuery({
            ...search,
            productTypes: search.product_types,
            reverse: sortFilterSlugToReverse[search.sort],
            minPrice: search.min_price,
            maxPrice: search.max_price,
            collection: params.collection,
         }),
      )

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
   const search = useDeferredValue(useSearch({ from: "/search/_layout" }))
   const query = useSuspenseQuery(
      listCollectionProductsQuery({
         ...search,
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
            <div className="-mt-8 flex size-full items-center justify-center text-balance px-8 text-center font-medium text-lg">
               <div>
                  <div className="relative mb-8">
                     <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
                     <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                        <InformationCircleIcon className="size-9" />
                     </Card>
                  </div>
                  <p className="text-foreground/90">
                     Не знайдено жодного товару.
                  </p>
               </div>
            </div>
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
