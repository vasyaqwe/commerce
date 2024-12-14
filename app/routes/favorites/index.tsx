import { listFavoritesQuery } from "@/favorites/queries"
import { Product } from "@/product/components/product"
import { ProductsGrid } from "@/product/components/products-grid"
import { ProductsPending } from "@/product/components/products-pending"
import { HeartIcon } from "@heroicons/react/24/outline"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/favorites/")({
   component: RouteComponent,
   loader: async ({ context }) => {
      context.queryClient.prefetchQuery(listFavoritesQuery())
   },
   pendingComponent: () => (
      <>
         <div className="mb-4 flex h-[82px] items-center justify-center bg-border/25 py-4 md:mb-8">
            <p className="font-semibold text-xl">Збережені</p>
         </div>
         <ProductsPending />
      </>
   ),
})

function RouteComponent() {
   const favorites = useSuspenseQuery(listFavoritesQuery())

   return (
      <>
         <div className="mb-4 flex h-[82px] items-center justify-center bg-border/25 py-4 md:mb-8">
            <p className="font-semibold text-xl">Збережені</p>
         </div>
         <div className="h-full min-h-[55vh]">
            {favorites.data.length === 0 ? (
               <div className="lg:-mt-20 -mt-16 grid h-full place-items-center text-center">
                  <div className="mx-auto flex flex-col gap-4">
                     <div className="mx-auto grid size-20 place-items-center rounded-full bg-border/25 shadow-1">
                        <HeartIcon
                           className="size-12 text-foreground/50"
                           strokeWidth={2.5}
                        />
                     </div>
                     <p className="text-center font-semibold text-lg">
                        Ви ще не зберегли жодного товару.
                     </p>
                  </div>
               </div>
            ) : (
               <ProductsGrid>
                  {favorites.data.map((item) => (
                     <Product
                        product={item}
                        key={item.id}
                     />
                  ))}
               </ProductsGrid>
            )}
         </div>
      </>
   )
}
