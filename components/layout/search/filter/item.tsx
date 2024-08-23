"use client"

import type { SortFilterItem } from "@/lib/constants"
import { cn, createUrl } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import type { ListItem, PathFilterItem } from "."

// biome-ignore lint/suspicious/noRedeclare: <explanation>
function PathFilterItem({ item }: { item: PathFilterItem }) {
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const active = pathname === item.path
   const newParams = new URLSearchParams(searchParams.toString())
   const DynamicTag = active ? "p" : Link

   newParams.delete("q")

   return (
      <li
         className="mt-2 flex text-black dark:text-white"
         key={item.title}
      >
         <DynamicTag
            href={createUrl(item.path, newParams)}
            className={cn(
               "w-full text-sm underline-offset-4 dark:hover:text-neutral-100 hover:underline",
               {
                  "underline underline-offset-4": active,
               },
            )}
         >
            {item.title}
         </DynamicTag>
      </li>
   )
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
function SortFilterItem({ item }: { item: SortFilterItem }) {
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
      <li
         className="mt-2 flex text-black text-sm dark:text-white"
         key={item.title}
      >
         <DynamicTag
            prefetch={!active ? false : undefined}
            href={href}
            className={cn("w-full hover:underline hover:underline-offset-4", {
               "underline underline-offset-4": active,
            })}
         >
            {item.title}
         </DynamicTag>
      </li>
   )
}

export function FilterItem({ item }: { item: ListItem }) {
   return "path" in item ? (
      <PathFilterItem item={item} />
   ) : (
      <SortFilterItem item={item} />
   )
}
