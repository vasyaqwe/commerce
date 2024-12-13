import { useEventListener } from "@/interactions/use-event-listener"
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
import { Button, buttonVariants } from "@/ui/components/button"
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
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/ui/components/popover"
import { Slider } from "@/ui/components/slider"
import { cn } from "@/ui/utils"
import { seo } from "@/utils/seo"
import { ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/outline"
import {
   Outlet,
   createFileRoute,
   useNavigate,
   useParams,
   useSearch,
} from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import { useRef, useState } from "react"
import { z } from "zod"

const MIN_PRICE = 50
const MAX_PRICE = 5000

const searchSchema = z.object({
   q: z.string(),
   sort: sortFilterSlugSchema.catch("relevance"),
   colors: z.array(colorFilterSlugSchema).catch([]),
   sizes: z.array(sizeFilterSlugSchema).catch([]),
   min_price: z
      .number()
      .min(MIN_PRICE)
      .max(MAX_PRICE - MIN_PRICE)
      .catch(MIN_PRICE),
   max_price: z
      .number()
      .min(MIN_PRICE + MIN_PRICE)
      .max(MAX_PRICE)
      .catch(MAX_PRICE),
})

export const Route = createFileRoute("/search/_layout")({
   component: RouteComponent,
   validateSearch: zodValidator(searchSchema),
   head: () => {
      return {
         meta: [
            ...seo({
               title: "Пошук",
            }),
         ],
      }
   },
})

function RouteComponent() {
   return (
      <>
         <div className="mb-3 flex items-center bg-border/25 py-2 md:mb-8 md:py-4">
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
            <div className="scrollbar-hidden container flex items-center gap-4 overflow-x-auto py-1 max-md:hidden">
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
   const params = useParams({ strict: false })
   const search = useSearch({ from: "/search/_layout" })
   const navigate = useNavigate({ from: Route.fullPath })

   const sort = search.sort
   const colors = search.colors
   const sizes = search.sizes
   const minPrice = search.min_price
   const maxPrice = search.max_price

   const [priceRangeOpen, setPriceRangeOpen] = useState(false)
   const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
   const isDragging = useRef(false)

   useEventListener(
      "click",
      (e) => {
         if (isDragging.current) {
            e.preventDefault()
            e.stopPropagation()
         }
      },
      undefined,
      true,
   )

   return (
      <>
         <Combobox
            value={sort}
            onValueChange={(sort) => {
               navigate({ search: { ...search, sort: sort as never } })
            }}
         >
            <ComboboxTrigger className="w-[90vw] md:w-[210px]">
               Сортувати
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] md:w-[210px]">
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
         {params.collection ? null : (
            <>
               <Combobox
                  multiple
                  value={colors}
                  onValueChange={(colors) => {
                     navigate({
                        search: { ...search, colors: colors as never },
                     })
                  }}
               >
                  <ComboboxTrigger className="w-[90vw] md:w-[170px]">
                     Колір
                  </ComboboxTrigger>
                  <ComboboxContent className="w-[91vw] md:w-[170px] ">
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
                                    colorFilterSlugToClassName[item] ===
                                       "bg-black"
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
         )}
         <Popover
            open={priceRangeOpen}
            onOpenChange={setPriceRangeOpen}
         >
            <PopoverTrigger
               className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-[90vw] justify-start md:w-[230px]",
               )}
            >
               Ціна
               <ChevronUpDownIcon
                  strokeWidth={2.5}
                  className="-mr-1 ml-auto size-5 shrink-0 text-foreground/50"
               />
            </PopoverTrigger>
            <PopoverContent className="w-[91vw] md:w-[230px]">
               <div className="-mt-1 mb-4 flex items-center justify-between font-semibold">
                  <span>
                     <span className="sr-only">Від</span> ₴{priceRange[0]}
                  </span>
                  <span>
                     <span className="sr-only">До</span>₴{priceRange[1]}{" "}
                  </span>
               </div>
               <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={10}
                  minStepsBetweenThumbs={10}
                  onPointerDown={() => {
                     isDragging.current = true
                  }}
                  onPointerUp={() =>
                     setTimeout(() => {
                        isDragging.current = false
                     }, 0)
                  }
               />
               <div className="mt-5 grid items-center gap-2">
                  <Button
                     variant={"tertiary"}
                     size={"sm"}
                     onClick={() => {
                        navigate({
                           search: {
                              ...search,
                              min_price: priceRange[0],
                              max_price: priceRange[1],
                           },
                        })
                     }}
                  >
                     Застосувати
                  </Button>
                  <Button
                     disabled={minPrice === MIN_PRICE && maxPrice === MAX_PRICE}
                     size={"sm"}
                     variant={"ghost"}
                     className="hover:enabled:bg-[#3d4046]"
                     onClick={() => {
                        navigate({
                           search: {
                              ...search,
                              min_price: MIN_PRICE,
                              max_price: MAX_PRICE,
                           },
                        })
                        setPriceRange([MIN_PRICE, MAX_PRICE])
                     }}
                  >
                     Скинути
                  </Button>
               </div>
            </PopoverContent>
         </Popover>
      </>
   )
}
