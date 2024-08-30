import { Filters } from "@/app/search/_components/filters"
import { ChildrenWrapper } from "./children-wrapper"

export default function SearchLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <>
         <ChildrenWrapper>
            <div className="mb-8 flex items-center bg-border/40 py-6">
               <div className="container">
                  <Filters />
               </div>
            </div>
            <div className="h-full min-h-[58vh]">{children}</div>
         </ChildrenWrapper>
      </>
   )
}
