import bottom from "@/assets/bottom1.jpg"
import {
   Header,
   HeaderBackButton,
   HeaderTitle,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import {
   PageDescription,
   PageDescriptionHeading,
} from "@/routes/-components/page-description"
import { cn } from "@/ui/utils"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/collections")({
   component: RouteComponent,
})

function RouteComponent() {
   const menu = [
      { title: "Верх", path: `топи`, image: bottom },
      { title: "Низ", path: `низ`, image: bottom },
      {
         title: "Аксесуари",
         path: `аксесуари`,
         image: bottom,
      },
   ] as const

   return (
      <>
         <Header>
            <HeaderBackButton />
            <HeaderTitle>Каталог</HeaderTitle>
         </Header>
         <Main>
            <PageDescription className="max-md:hidden">
               <PageDescriptionHeading>Каталог</PageDescriptionHeading>
            </PageDescription>
            <ul className="divide-y divide-border px-4">
               {menu.map((item) => (
                  <li
                     key={item.path}
                     className="py-3"
                  >
                     <Link
                        to="/search/$collection"
                        params={{ collection: item.path }}
                        className="flex items-center gap-4 font-medium"
                     >
                        <img
                           className={cn(
                              "size-9 shrink-0 rounded-full border border-border object-cover object-top shadow-xs",
                           )}
                           src={item.image}
                           alt={""}
                        />
                        {item.title}
                        <span className="ml-auto md:hidden">
                           <ArrowRightIcon
                              className="size-[18px]"
                              strokeWidth={1.75}
                           />
                        </span>
                     </Link>
                  </li>
               ))}
            </ul>
         </Main>
      </>
   )
}
