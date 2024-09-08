"use client"

import type { ProductOption, ProductVariant } from "@/lib/shopify/types"
import { Chip } from "@/ui/chip"
import { Tooltip } from "@/ui/tooltip"
import { createUrl } from "@/ui/utils"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Combination = {
   id: string
   availableForSale: boolean
   [key: string]: string | boolean
}
type ProductState = {
   [key: string]: string
}
export function VariantSelector({
   options,
   variants,
}: {
   options: ProductOption[]
   variants: ProductVariant[]
}) {
   const searchParams = useSearchParams()
   const pathname = usePathname()
   const router = useRouter()
   const getInitialState = () => {
      const params: ProductState = {}
      for (const [key, value] of searchParams.entries()) {
         params[key] = value
      }
      return params
   }

   const [state, setOptimisticState] = useState(getInitialState())

   const updateOption = (name: string, value: string) => {
      const newState = { [name]: value }
      setOptimisticState({ ...state, ...newState })
      return { ...state, ...newState }
   }

   const updateURL = (params: URLSearchParams) => {
      const href = createUrl(pathname, params)

      router.replace(href)
   }
   const hasNoOptionsOrJustOneOption =
      !options.length ||
      (options.length === 1 && options[0]?.values.length === 1)

   if (hasNoOptionsOrJustOneOption) {
      return null
   }

   const combinations: Combination[] = variants.map((variant) => ({
      id: variant.id,
      availableForSale: variant.availableForSale,
      ...variant.selectedOptions.reduce(
         (accumulator, option) => ({
            // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
            ...accumulator,
            [option.name.toLowerCase()]: option.value,
         }),
         {},
      ),
   }))

   return (
      <div className="space-y-6">
         {options.map((option) => (
            <form key={option.id}>
               <dl className="">
                  <dt className="mb-3 font-medium text-sm tracking-wide">
                     {option.name}
                  </dt>
                  <dd className="flex flex-wrap gap-3">
                     {option.values.map((value) => {
                        const optionNameLowerCase = option.name.toLowerCase()

                        // Base option params on current selectedOptions so we can preserve any other param state.
                        const optionParams = {
                           ...state,
                           [optionNameLowerCase]: value,
                        }

                        // Filter out invalid options and check if the option combination is available for sale.
                        const filtered = Object.entries(optionParams).filter(
                           ([key, value]) =>
                              options.find(
                                 (option) =>
                                    option.name.toLowerCase() === key &&
                                    option.values.includes(value),
                              ),
                        )
                        const isAvailableForSale = combinations.find(
                           (combination) =>
                              filtered.every(
                                 ([key, value]) =>
                                    combination[key] === value &&
                                    combination.availableForSale,
                              ),
                        )

                        const isActive = state[optionNameLowerCase] === value

                        const Component = (
                           <Chip
                              key={value}
                              name={option.name}
                              onChange={() => {
                                 const newState = updateOption(
                                    optionNameLowerCase,
                                    value,
                                 )
                                 updateURL(new URLSearchParams(newState))
                              }}
                              checked={isActive}
                              disabled={!isAvailableForSale}
                           >
                              {value}
                           </Chip>
                        )

                        return !isAvailableForSale ? (
                           <Tooltip
                              delayDuration={0}
                              content={
                                 <span>
                                    Немає в наявності{" "}
                                    {/* <span
                                       className={cn(
                                          option.name !== "Розмір"
                                             ? "lowercase"
                                             : "",
                                       )}
                                    >
                                       ({value} {option.name})
                                    </span> */}
                                 </span>
                              }
                              key={value}
                           >
                              <span>{Component}</span>
                           </Tooltip>
                        ) : (
                           Component
                        )
                     })}
                  </dd>
               </dl>
            </form>
         ))}
      </div>
   )
}
