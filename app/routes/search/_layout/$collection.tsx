import { sortFilterSlugToReverse } from "@/lib/shopify/constants"
import {
   collectionByHandle,
   listCollectionProducts,
} from "@/lib/shopify/functions"
import type { listCollectionProductsParams } from "@/lib/shopify/schema"
import { Product } from "@/routes/search/-components/product"
import { Card } from "@/ui/components/card"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, notFound, useSearch } from "@tanstack/react-router"
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
         data.collection,
         data.sort,
         data.reverse,
      ],
      queryFn: () => listCollectionProducts({ data }),
   })

export const Route = createFileRoute("/search/_layout/$collection")({
   component: RouteComponent,
   loaderDeps: ({ search }) => ({ search }),
   loader: async ({ deps: { search }, params, context }) => {
      const collection = await context.queryClient.ensureQueryData(
         collectionByHandleQuery({
            handle: params.collection,
         }),
      )
      if (!collection) throw notFound()

      await context.queryClient.prefetchQuery(
         listCollectionProductsQuery({
            ...search,
            reverse: !search.sort
               ? false
               : sortFilterSlugToReverse[search.sort],
            collection: params.collection,
         }),
      )
   },
})

function RouteComponent() {
   const params = Route.useParams()
   const search = useSearch({ from: "/search/_layout" })
   const query = useSuspenseQuery(
      listCollectionProductsQuery({
         ...search,
         reverse: !search.sort ? false : sortFilterSlugToReverse[search.sort],
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
            <div className="container grid grid-cols-1 gap-2 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
               {products.map((p) => (
                  <Product
                     product={p}
                     key={p.handle}
                  />
               ))}
            </div>
         )}
      </>
   )
}
