import { sortFilterSlugToReverse } from "@/lib/shopify/constants"
import { listProducts } from "@/lib/shopify/functions"
import type { listProductsParams } from "@/lib/shopify/schema"
import { Product } from "@/routes/search/-components/product"
import { ProductsPending } from "@/routes/search/-components/products-pending"
import { Card } from "@/ui/components/card"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, useSearch } from "@tanstack/react-router"
import { useDeferredValue } from "react"
import type { z } from "zod"

const listProductsQuery = (data: z.infer<typeof listProductsParams>) =>
   queryOptions({
      queryKey: [
         "list_products",
         data.q,
         data.sort,
         data.reverse,
         data.colors,
         data.sizes,
         data.minPrice,
         data.maxPrice,
      ],
      queryFn: () => listProducts({ data }),
   })

export const Route = createFileRoute("/search/_layout/")({
   component: RouteComponent,
   pendingComponent: ProductsPending,
   loaderDeps: ({ search }) => ({ search }),
   loader: async ({ deps: { search }, context }) => {
      context.queryClient.prefetchQuery(
         listProductsQuery({
            ...search,
            minPrice: search.min_price,
            maxPrice: search.max_price,
            reverse: sortFilterSlugToReverse[search.sort],
         }),
      )
   },
})

function RouteComponent() {
   // defer to avoid showing pendingComponent when search changes
   const search = useDeferredValue(useSearch({ from: "/search/_layout" }))
   const query = useSuspenseQuery(
      listProductsQuery({
         ...search,
         minPrice: search.min_price,
         maxPrice: search.max_price,
         reverse: sortFilterSlugToReverse[search.sort],
      }),
   )
   const products = query.data

   return (
      <>
         {products.length === 0 ? (
            <div className="flex size-full items-center justify-center text-balance px-8 text-center font-medium text-lg">
               <div>
                  <div className="relative mb-8">
                     <Card className="absolute inset-0 mx-auto grid h-28 w-[5.5rem] rotate-6 place-content-center rounded-xl" />
                     <Card className="-rotate-6 mx-auto grid h-28 w-[5.5rem] place-content-center rounded-xl">
                        <InformationCircleIcon className="size-9" />
                     </Card>
                  </div>
                  <p className="text-foreground/90">
                     {search.q && search.q.trim().length > 0
                        ? `За запитом "${search.q}" не знайдено жодного товару.`
                        : "Не знайдено жодного товару."}
                  </p>
               </div>
            </div>
         ) : (
            <div className="container grid grid-cols-2 gap-2 lg:grid-cols-4 md:grid-cols-3">
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
