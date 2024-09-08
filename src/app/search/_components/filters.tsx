"use client"

import { colorFilter, sizeFilter, sortFilter } from "@/config"
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
} from "@/ui/combobox"
import { createUrl } from "@/ui/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Filters() {
   const pathname = usePathname()
   const router = useRouter()
   const searchParams = useSearchParams()
   const q = searchParams.get("q")
   const sort = searchParams.get("sort")
   const color = searchParams.get("color")
   const size = searchParams.get("size")

   return (
      <>
         <Combobox
            value={searchParams.get("sort") ?? "relevance"}
            onValueChange={(sort) => {
               const href = createUrl(
                  pathname,
                  new URLSearchParams({
                     ...(q && { q }),
                     ...(color && { color }),
                     ...(size && { size }),
                     ...{ sort: sort ?? "relevance" },
                  }),
               )
               router.replace(href)
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
                     ...(sort && { sort }),
                     ...(size && { size }),
                     ...(colors.length > 0 && {
                        color: colors.join(","),
                     }),
                  }),
               )
               router.replace(href)
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
         <Combobox
            multiple
            value={searchParams.getAll("size").join().split(",")}
            onValueChange={(sizes) => {
               const href = createUrl(
                  pathname,
                  new URLSearchParams({
                     ...(q && { q }),
                     ...(sort && { sort }),
                     ...(color && { color }),
                     ...(sizes.length > 0 && {
                        size: sizes.join(","),
                     }),
                  }),
               )
               router.replace(href)
            }}
         >
            <ComboboxTrigger className="w-[180px]">
               <ComboboxSelectedItems />
               <ComboboxInput placeholder="Розмір" />
               <ComboboxClearButton />
               <ComboboxDisclosure />
            </ComboboxTrigger>
            <ComboboxContent className="w-[185px] ">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {sizeFilter.map((item) => {
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
