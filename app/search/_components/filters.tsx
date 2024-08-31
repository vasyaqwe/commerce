"use client"

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
} from "@/components/ui/select"
import { sortFilter } from "@/lib/constants"
import { createUrl } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Filters() {
   const pathname = usePathname()
   const router = useRouter()
   const searchParams = useSearchParams()
   const q = searchParams.get("q")

   return (
      <>
         <Select
            value={searchParams.get("sort") ?? "relevance"}
            onValueChange={(slug) => {
               if (slug === "relevance") {
                  return router.push(
                     createUrl(
                        pathname,
                        new URLSearchParams({ ...(q && { q }) }),
                     ),
                  )
               }
               const href = createUrl(
                  pathname,
                  new URLSearchParams({
                     ...(q && { q }),
                     ...(slug?.length && { sort: slug }),
                  }),
               )
               router.push(href)
            }}
         >
            <SelectTrigger>Сортувати</SelectTrigger>
            <SelectContent>
               {sortFilter.map((item) => {
                  return (
                     <SelectItem
                        value={item.slug ?? "relevance"}
                        key={item.title}
                     >
                        {item.title}
                     </SelectItem>
                  )
               })}
            </SelectContent>
         </Select>
      </>
   )
}
