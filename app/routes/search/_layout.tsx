import {
   colorFilterSlugToClassName,
   colorFilterSlugs,
   productTypeFilterSlugs,
   sizeFilterSlugs,
   sortFilterSlugToTitle,
   sortFilterSlugs,
} from "@/filter/constants"
import {
   colorFilterSlugSchema,
   productTypeFilterSlugSchema,
   sizeFilterSlugSchema,
   sortFilterSlugSchema,
} from "@/filter/schema"
import { useEventListener } from "@/interactions/use-event-listener"
import {
   Header,
   HeaderBackButton,
   HeaderButtons,
   HeaderTitle,
} from "@/routes/-components/header"
import { Main } from "@/routes/-components/main"
import { PageDescription } from "@/routes/-components/page-description"
import { seo } from "@/seo/utils"
import { Button, buttonVariants } from "@/ui/components/button"
import {
   Combobox,
   ComboboxContent,
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
import { ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/outline"
import {
   Outlet,
   createFileRoute,
   useNavigate,
   useParams,
   useSearch,
} from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import * as React from "react"
import { z } from "zod"

const MIN_PRICE = 50
const MAX_PRICE = 5000

const searchSchema = z.object({
   q: z.string().catch(""),
   sort: sortFilterSlugSchema.catch("relevance"),
   product_types: z.array(productTypeFilterSlugSchema).catch([]),
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
   const search = React.useDeferredValue(useSearch({ from: "/search/_layout" }))
   const params = useParams({ strict: false })

   return (
      <>
         <Header>
            <HeaderBackButton />
            <HeaderTitle>
               {params.collection ? (
                  <span className="capitalize">{params.collection}</span>
               ) : search.q && search.q.trim().length > 0 ? (
                  `Пошук "${search.q}"`
               ) : (
                  "Пошук"
               )}
            </HeaderTitle>
            <HeaderButtons />
         </Header>
         <Main>
            <PageDescription>
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
            </PageDescription>
            <Outlet />
         </Main>
      </>
   )
}

function FiltersContent() {
   const params = useParams({ strict: false })
   const search = useSearch({ from: Route.id })
   const navigate = useNavigate({ from: Route.fullPath })

   const {
      sort,
      colors,
      sizes,
      product_types: productTypes,
      min_price: minPrice,
      max_price: maxPrice,
   } = search

   const [priceRangeOpen, setPriceRangeOpen] = React.useState(false)
   const [priceRange, setPriceRange] = React.useState([minPrice, maxPrice])
   const isDragging = React.useRef(false)

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
               navigate({ search: (prev) => ({ ...prev, sort }) })
            }}
         >
            <ComboboxTrigger className="w-[90vw] md:w-[210px]">
               Сортувати
            </ComboboxTrigger>
            <ComboboxContent className="w-[91vw] md:w-[210px]">
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
         {params.collection ? (
            <Combobox
               canBeEmpty
               value={productTypes[0]}
               onValueChange={(productType) => {
                  navigate({
                     search: (prev) => ({
                        ...prev,
                        product_types: prev.product_types.includes(
                           productType as never,
                        )
                           ? []
                           : [productType],
                     }),
                  })
               }}
            >
               <ProductTypeComboboxContent />
            </Combobox>
         ) : (
            <Combobox
               multiple
               value={productTypes}
               onValueChange={(productTypes) => {
                  navigate({
                     search: (prev) => ({
                        ...prev,
                        product_types: productTypes,
                     }),
                  })
               }}
            >
               <ProductTypeComboboxContent />
            </Combobox>
         )}
         {params.collection ? null : (
            <>
               <Combobox
                  multiple
                  value={colors}
                  onValueChange={(colors) => {
                     navigate({
                        search: (prev) => ({ ...prev, colors }),
                     })
                  }}
               >
                  <ComboboxTrigger className="w-[90vw] md:w-[170px]">
                     Колір
                  </ComboboxTrigger>
                  <ComboboxContent className="w-[91vw] md:w-[170px] ">
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
                                    "-mb-0.5 mr-2 inline-block size-4 rounded-full shadow-1",
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
                     navigate({ search: (prev) => ({ ...prev, sizes }) })
                  }}
               >
                  <ComboboxTrigger className="w-[90vw] md:w-[150px]">
                     Розмір
                  </ComboboxTrigger>
                  <ComboboxContent className="w-[91vw] md:w-[150px] ">
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
                           search: (prev) => ({
                              ...prev,
                              min_price: priceRange[0],
                              max_price: priceRange[1],
                           }),
                        })
                     }}
                  >
                     Застосувати
                  </Button>
                  <Button
                     disabled={
                        priceRange[0] === MIN_PRICE &&
                        priceRange[1] === MAX_PRICE
                     }
                     size={"sm"}
                     variant={"ghost"}
                     className="hover:enabled:bg-[#3d4046]"
                     onClick={() => {
                        navigate({
                           search: (prev) => ({
                              ...prev,
                              min_price: MIN_PRICE,
                              max_price: MAX_PRICE,
                           }),
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

function ProductTypeComboboxContent() {
   return (
      <>
         <ComboboxTrigger className="w-[90vw] md:w-[170px]">
            Стиль
         </ComboboxTrigger>
         <ComboboxContent className="w-[91vw] md:w-[170px] ">
            {productTypeFilterSlugs.map((item) => {
               return (
                  <ComboboxItem
                     value={item}
                     key={item}
                  >
                     {item}
                  </ComboboxItem>
               )
            })}
         </ComboboxContent>
      </>
   )
}
