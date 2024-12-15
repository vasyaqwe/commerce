import { listFavoritesQuery } from "@/favorites/queries"
import { Product } from "@/product/components/product"
import { ProductsGrid } from "@/product/components/products-grid"
import { ProductsPending } from "@/product/components/products-pending"
import {
   Header,
   HeaderBackButton,
   HeaderButtons,
   HeaderTitle,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import {
   PageDescription,
   PageDescriptionHeading,
} from "@/routes/-components/page-description"
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
         <Header>
            <HeaderBackButton />
            <HeaderTitle>Збережені</HeaderTitle>
            <HeaderButtons />
         </Header>
         <Main>
            <PageDescription className="max-md:hidden">
               <PageDescriptionHeading>Збережені</PageDescriptionHeading>
            </PageDescription>
            <ProductsPending />
         </Main>
      </>
   ),
})

function RouteComponent() {
   const favorites = useSuspenseQuery(listFavoritesQuery())

   return (
      <>
         <Header>
            <HeaderBackButton />
            <HeaderTitle>Збережені</HeaderTitle>
            <HeaderButtons />
         </Header>
         <Main>
            <PageDescription className="max-md:hidden">
               <PageDescriptionHeading>Збережені</PageDescriptionHeading>
            </PageDescription>
            <div className="h-full min-h-[55vh] max-md:mt-4">
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
         </Main>
      </>
   )
}
