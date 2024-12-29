import {
   Header,
   HeaderButtons,
   HeaderNavigation,
   HeaderSearch,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import { Icons } from "@/ui/components/icons"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
   component: RouteComponent,
})

function RouteComponent() {
   return (
      <>
         <Header>
            <HeaderNavigation className="max-md:hidden" />
            <Icons.logo className="md:hidden" />
            <HeaderSearch />
            <HeaderButtons />
         </Header>
         <Main>Hello homepage!</Main>
      </>
   )
}
