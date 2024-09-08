import { Filters } from "@/app/search/_components/filter"
import { ChildrenWrapper } from "./_components/children-wrapper"

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <ChildrenWrapper>
         <div className="mb-8 flex items-center bg-border/25 py-5">
            <div className="container flex items-center gap-4">
               <Filters />
            </div>
         </div>
         <div className="h-full min-h-[58vh]">{children}</div>
      </ChildrenWrapper>
   )
}
