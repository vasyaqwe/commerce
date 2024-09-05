"use client"

import {
   Combobox,
   ComboboxClearButton,
   ComboboxContent,
   ComboboxDisclosure,
   ComboboxEmpty,
   ComboboxInput,
   ComboboxItem,
   ComboboxSelectedItems,
   ComboboxTrigger,
} from "@/components/ui/combobox"
import { colorFilter, sortFilter } from "@/lib/constants"
import { createUrl } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Filters() {
   const pathname = usePathname()
   const router = useRouter()
   const searchParams = useSearchParams()
   const q = searchParams.get("q")

   return (
      <>
         <Combobox
            value={searchParams.get("sort")}
            onValueChange={(sort) => {
               const href = createUrl(
                  pathname,
                  new URLSearchParams({
                     ...(q && { q }),
                     ...{ sort: sort ?? "relevance" },
                  }),
               )
               router.push(href)
            }}
         >
            <ComboboxTrigger className="w-[230px]">
               <ComboboxSelectedItems />
               <ComboboxInput placeholder="Сортувати" />
               <ComboboxClearButton />
               <ComboboxDisclosure />
            </ComboboxTrigger>
            <ComboboxContent className="w-[235px]">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {sortFilter.map((item) => {
                  return (
                     <ComboboxItem
                        value={item.slug ?? "relevance"}
                        key={item.title}
                     >
                        {item.title}
                     </ComboboxItem>
                  )
               })}
            </ComboboxContent>
         </Combobox>
         <Combobox
            multiple
            value={searchParams.getAll("color").join().split(",")}
            onValueChange={(colors) => {
               const href = createUrl(
                  pathname,
                  new URLSearchParams({
                     ...(q && { q }),
                     ...(colors.length > 0 && {
                        color: colors.join(","),
                     }),
                  }),
               )
               router.push(href)
            }}
         >
            <ComboboxTrigger className="w-[180px]">
               <ComboboxSelectedItems />
               <ComboboxInput placeholder="Колір" />
               <ComboboxClearButton />
               <ComboboxDisclosure />
            </ComboboxTrigger>
            <ComboboxContent className="w-[185px] ">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {colorFilter.map((item) => {
                  return (
                     <ComboboxItem
                        value={item.slug}
                        key={item.title}
                     >
                        {item.title}
                     </ComboboxItem>
                  )
               })}
            </ComboboxContent>
         </Combobox>
      </>
   )
}
