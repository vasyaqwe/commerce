import { sortFilterSlugToReverse } from "@/filter/constants"
import { Product } from "@/product/components/product"
import { ProductsGrid } from "@/product/components/products-grid"
import { ProductsPending } from "@/product/components/products-pending"
import { listProducts } from "@/product/functions"
import type { listProductsParams } from "@/product/schema"
import {
   FeedbackState,
   FeedbackStateDescription,
   FeedbackStateIcon,
} from "@/ui/components/feedback-state"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, useSearch } from "@tanstack/react-router"
import * as React from "react"
import type { z } from "zod"

const listProductsQuery = (data: z.infer<typeof listProductsParams>) =>
   queryOptions({
      queryKey: ["list_products", { ...data }],
      queryFn: () => listProducts({ data }),
   })

export const Route = createFileRoute("/search/_layout/")({
   component: RouteComponent,
   pendingComponent: ProductsPending,
   loaderDeps: ({ search }) => ({ search }),
   loader: async ({ deps: { search }, context }) =>
      context.queryClient.ensureQueryData(
         listProductsQuery({
            q: search.q,
            sort: search.sort,
            colors: search.colors,
            sizes: search.sizes,
            productTypes: search.product_types,
            minPrice: search.min_price,
            maxPrice: search.max_price,
            reverse: sortFilterSlugToReverse[search.sort],
         }),
      ),
})

function RouteComponent() {
   // defer to avoid showing pendingComponent when search changes
   const search = React.useDeferredValue(useSearch({ from: "/search/_layout" }))
   const query = useSuspenseQuery(
      listProductsQuery({
         q: search.q,
         sort: search.sort,
         colors: search.colors,
         sizes: search.sizes,
         productTypes: search.product_types,
         minPrice: search.min_price,
         maxPrice: search.max_price,
         reverse: sortFilterSlugToReverse[search.sort],
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
                  {search.q && search.q.trim().length > 0
                     ? `За запитом "${search.q}" не знайдено жодного товару.`
                     : "Не знайдено жодного товару."}
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
