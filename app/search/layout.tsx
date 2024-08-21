import { Footer } from "components/layout/footer"
import { FilterList } from "components/layout/search/filter"
import { sorting } from "lib/constants"
import { getCollections } from "lib/shopify"
import { cn } from "lib/utils"
import { Suspense } from "react"
import { ChildrenWrapper } from "./children-wrapper"

export default function SearchLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <>
         <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
            <div className="order-first w-full flex-none md:max-w-[125px]">
               <Collections />
            </div>
            <div className="order-last min-h-screen w-full md:order-none">
               <ChildrenWrapper>{children}</ChildrenWrapper>
            </div>
            <div className="order-none flex-none md:order-last md:w-[125px]">
               <FilterList
                  list={sorting}
                  title="Sort by"
               />
            </div>
         </div>
         <Footer />
      </>
   )
}

async function CollectionList() {
   const collections = await getCollections()
   return (
      <FilterList
         list={collections}
         title="Collections"
      />
   )
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded"
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300"
const items = "bg-neutral-400 dark:bg-neutral-700"

function Collections() {
   return (
      <Suspense
         fallback={
            <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
               <div className={cn(skeleton, activeAndTitles)} />
               <div className={cn(skeleton, activeAndTitles)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
               <div className={cn(skeleton, items)} />
            </div>
         }
      >
         <CollectionList />
      </Suspense>
   )
}
