import { listFavoritesQuery } from "@/favorites/queries"
import { Product } from "@/product/components/product"
import { ProductsGrid } from "@/product/components/products-grid"
import { ProductsPending } from "@/product/components/products-pending"
import {
   Header,
   HeaderButtons,
   HeaderNavigation,
   HeaderTitle,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import {
   PageDescription,
   PageDescriptionHeading,
} from "@/routes/-components/page-description"
import {
   FeedbackState,
   FeedbackStateDescription,
   FeedbackStateIcon,
   FeedbackStateTitle,
} from "@/ui/components/feedback-state"
import { HeartIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/favorites/")({
   component: RouteComponent,
})

function RouteComponent() {
   const favorites = useQuery(listFavoritesQuery())

   if (favorites.isPending)
      return (
         <>
            <Header>
               <HeaderNavigation />
               <HeaderTitle>Збережені</HeaderTitle>
               <HeaderButtons />
            </Header>
            <Main>
               <PageDescription className="max-md:hidden">
                  <PageDescriptionHeading>Збережені</PageDescriptionHeading>
               </PageDescription>
               <div className="max-md:mt-4">
                  <ProductsPending />
               </div>
            </Main>
         </>
      )

   if (favorites.isError)
      return (
         <>
            <Header>
               <HeaderNavigation />
               <HeaderTitle>Збережені</HeaderTitle>
               <HeaderButtons />
            </Header>
            <Main>
               <PageDescription className="max-md:hidden">
                  <PageDescriptionHeading>Збережені</PageDescriptionHeading>
               </PageDescription>
               <FeedbackState>
                  <FeedbackStateIcon>
                     <XCircleIcon
                        className="size-12 text-destructive/90"
                        strokeWidth={2}
                     />
                  </FeedbackStateIcon>
                  <FeedbackStateTitle>От-такої..</FeedbackStateTitle>
                  <FeedbackStateDescription className="mb-5">
                     Сталася технічна проблема. <br /> Будь ласка, спробуйте ще
                     раз пізніше.{" "}
                  </FeedbackStateDescription>
               </FeedbackState>
            </Main>
         </>
      )

   return (
      <>
         <Header>
            <HeaderNavigation />
            <HeaderTitle>Збережені</HeaderTitle>
            <HeaderButtons />
         </Header>
         <Main>
            <PageDescription className="max-md:hidden">
               <PageDescriptionHeading>Збережені</PageDescriptionHeading>
            </PageDescription>
            <div className="h-full max-md:mt-4">
               {favorites.data.length === 0 ? (
                  <FeedbackState>
                     <FeedbackStateIcon>
                        <HeartIcon
                           className="size-12 text-foreground/50"
                           strokeWidth={2}
                        />
                     </FeedbackStateIcon>
                     <FeedbackStateDescription className="mb-5">
                        Ви ще не зберегли жодного товару.
                     </FeedbackStateDescription>
                  </FeedbackState>
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
