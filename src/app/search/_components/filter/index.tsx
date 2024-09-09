"use client"

import { buttonVariants } from "@/ui/components/button"
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
} from "@/ui/components/combobox"
import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/ui/components/drawer"
import { cn, createUrl } from "@/ui/utils"
import { FunnelIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { colorFilter, sizeFilter, sortFilter } from "./constants"

export function Filters() {
   return (
      <>
         <div className="container">
            <Drawer>
               <DrawerTrigger
                  className={cn(
                     buttonVariants({ variant: "outline", size: "sm" }),
                     "md:hidden",
                  )}
               >
                  <FunnelIcon className="size-5" />
                  Фільтри
               </DrawerTrigger>
               <DrawerContent>
                  <DrawerHeader>
                     <DrawerTitle>Фільтри</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col items-center justify-center gap-5 py-6">
                     <FiltersContent />
                  </div>
               </DrawerContent>
            </Drawer>
         </div>
         <div className="container flex items-center gap-4 max-md:hidden">
            <FiltersContent />
         </div>
      </>
   )
}

function FiltersContent() {
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
            <ComboboxTrigger className="w-[90vw] lg:w-[230px]">
               <ComboboxSelectedItems />
               <ComboboxInput placeholder="Сортувати" />
               <ComboboxClearButton />
               <ComboboxDisclosure />
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] lg:w-[235px]">
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
            <ComboboxTrigger className="w-[90vw] lg:w-[180px]">
               <ComboboxSelectedItems />
               <ComboboxInput placeholder="Колір" />
               <ComboboxClearButton />
               <ComboboxDisclosure />
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] lg:w-[185px] ">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {colorFilter.map((item) => {
                  return (
                     <ComboboxItem
                        value={item.slug}
                        key={item.title}
                     >
                        <span
                           style={{ backgroundColor: item.color }}
                           aria-hidden={true}
                           className={cn(
                              "-mb-0.5 mr-2 inline-block size-4 rounded-full shadow-button",
                              item.color,
                              item.color === "bg-black"
                                 ? "shadow-none outline outline-popover-icon"
                                 : "",
                           )}
                        />
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
            <ComboboxTrigger className="w-[90vw] lg:w-[150px]">
               <ComboboxSelectedItems />
               <ComboboxInput placeholder="Розмір" />
               <ComboboxClearButton />
               <ComboboxDisclosure />
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] lg:w-[155px] ">
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
