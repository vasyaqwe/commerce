"use client"

import {
   type SortFilterItem as SortFilterItemType,
   sorting,
} from "@/lib/constants"
import { cn, createUrl } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChildrenWrapper } from "./children-wrapper"

export default function SearchLayout({
   children,
}: { children: React.ReactNode }) {
   return (
      <div className="container">
         <div className="flex items-center">
            {sorting.map((item) => (
               <SortFilterItem
                  item={item}
                  key={item.slug}
               />
            ))}
         </div>
         <ChildrenWrapper>{children}</ChildrenWrapper>
      </div>
   )
}

function SortFilterItem({ item }: { item: SortFilterItemType }) {
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const active = searchParams.get("sort") === item.slug
   const q = searchParams.get("q")
   const href = createUrl(
      pathname,
      new URLSearchParams({
         ...(q && { q }),
         ...(item.slug?.length && { sort: item.slug }),
      }),
   )
   const DynamicTag = active ? "p" : Link

   return (
      <DynamicTag
         prefetch={!active ? false : undefined}
         href={href}
         className={cn("w-full hover:underline hover:underline-offset-4", {
            "underline underline-offset-4": active,
         })}
      >
         {item.title}
      </DynamicTag>
   )
}
