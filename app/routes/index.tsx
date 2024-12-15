import {
   Header,
   HeaderButtons,
   HeaderNavigation,
   HeaderSearch,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
   component: RouteComponent,
})

function RouteComponent() {
   return (
      <>
         <Header>
            <HeaderNavigation />
            <HeaderSearch />
            <HeaderButtons />
         </Header>
         <Main>Hello homepage!</Main>
      </>
   )
}
