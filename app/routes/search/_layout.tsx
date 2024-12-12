import {
   colorFilterSlugToClassName,
   colorFilterSlugs,
   sizeFilterSlugs,
   sortFilterSlugToTitle,
   sortFilterSlugs,
} from "@/lib/shopify/constants"
import {
   colorFilterSlugSchema,
   sizeFilterSlugSchema,
   sortFilterSlugSchema,
} from "@/lib/shopify/schema"
import { buttonVariants } from "@/ui/components/button"
import {
   Combobox,
   ComboboxContent,
   ComboboxEmpty,
   ComboboxItem,
   ComboboxTrigger,
} from "@/ui/components/combobox"
import {
   Drawer,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/ui/components/drawer"
import { cn } from "@/ui/utils"
import { FunnelIcon } from "@heroicons/react/24/outline"
import {
   Outlet,
   createFileRoute,
   useNavigate,
   useSearch,
} from "@tanstack/react-router"
import { z } from "zod"

const searchSchema = z.object({
   q: z.string(),
   sort: sortFilterSlugSchema,
   colors: z.array(colorFilterSlugSchema).optional(),
   sizes: z.array(sizeFilterSlugSchema).optional(),
})

export const Route = createFileRoute("/search/_layout")({
   component: RouteComponent,
   validateSearch: searchSchema.parse,
})

function RouteComponent() {
   return (
      <>
         <div className="mb-8 flex items-center bg-border/25 py-5">
            <div className="container md:hidden">
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
         </div>
         <div className="h-full min-h-[55vh]">
            <Outlet />
         </div>
      </>
   )
}

function FiltersContent() {
   const search = useSearch({ from: "/search/_layout" })
   const navigate = useNavigate({ from: Route.fullPath })

   const sort = search.sort
   const colors = search.colors
   const sizes = search.sizes

   return (
      <>
         <Combobox
            value={sort}
            onValueChange={(sort) => {
               navigate({ search: { ...search, sort: sort as never } })
            }}
         >
            <ComboboxTrigger className="w-[90vw] md:w-[230px]">
               Сортувати
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] md:w-[230px]">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {sortFilterSlugs.map((item) => {
                  return (
                     <ComboboxItem
                        value={item}
                        key={item}
                     >
                        {sortFilterSlugToTitle[item]}
                     </ComboboxItem>
                  )
               })}
            </ComboboxContent>
         </Combobox>
         <Combobox
            multiple
            value={colors}
            onValueChange={(colors) => {
               navigate({ search: { ...search, colors: colors as never } })
            }}
         >
            <ComboboxTrigger className="w-[90vw] md:w-[180px]">
               Колір
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] md:w-[180px] ">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {colorFilterSlugs.map((item) => {
                  return (
                     <ComboboxItem
                        value={item}
                        key={item}
                        className="capitalize"
                     >
                        <span
                           aria-hidden={true}
                           className={cn(
                              "-mb-0.5 mr-2 inline-block size-4 rounded-full shadow-button",
                              colorFilterSlugToClassName[item],
                              colorFilterSlugToClassName[item] === "bg-black"
                                 ? "shadow-none outline outline-popover-icon"
                                 : "",
                           )}
                        />
                        {item}
                     </ComboboxItem>
                  )
               })}
            </ComboboxContent>
         </Combobox>
         <Combobox
            multiple
            value={sizes}
            onValueChange={(sizes) => {
               navigate({ search: { ...search, sizes: sizes as never } })
            }}
         >
            <ComboboxTrigger className="w-[90vw] md:w-[150px]">
               Розмір
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] md:w-[150px] ">
               <ComboboxEmpty>Нічого не знайдено</ComboboxEmpty>
               {sizeFilterSlugs.map((item) => {
                  return (
                     <ComboboxItem
                        value={item}
                        key={item}
                        className="uppercase"
                     >
                        {item}
                     </ComboboxItem>
                  )
               })}
            </ComboboxContent>
         </Combobox>
      </>
   )
}
