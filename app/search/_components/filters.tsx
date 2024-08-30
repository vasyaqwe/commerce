"use client"

import { sorting } from "@/lib/constants"
import { cn, createUrl } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export function Filters() {
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const q = searchParams.get("q")

   return (
      <>
         {sorting.map((item) => {
            const active = searchParams.get("sort") === item.slug
            const href = createUrl(
               pathname,
               new URLSearchParams({
                  ...(q && { q }),
                  ...(item.slug?.length && { sort: item.slug }),
               }),
            )

            return (
               <Link
                  key={item.title}
                  prefetch={!active ? false : undefined}
                  href={href}
                  className={cn(
                     "w-full hover:underline hover:underline-offset-4",
                     {
                        "underline underline-offset-4": active,
                     },
                  )}
               >
                  {item.title}
               </Link>
            )
         })}
      </>
   )
}
