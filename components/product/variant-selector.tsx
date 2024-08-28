"use client"

import { useProduct, useUpdateURL } from "@/components/product/product-context"
import { Chip } from "@/components/ui/chip"
import type { ProductOption, ProductVariant } from "@/lib/shopify/types"

type Combination = {
   id: string
   availableForSale: boolean
   [key: string]: string | boolean
}

export function VariantSelector({
   options,
   variants,
}: {
   options: ProductOption[]
   variants: ProductVariant[]
}) {
   const { state, updateOption } = useProduct()
   const updateURL = useUpdateURL()
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

   return options.map((option) => (
      <form
         key={option.id}
         className="space-y-5"
      >
         <dl className="">
            <dt className="mb-4 font-medium text-sm tracking-wide">
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
                  const isAvailableForSale = combinations.find((combination) =>
                     filtered.every(
                        ([key, value]) =>
                           combination[key] === value &&
                           combination.availableForSale,
                     ),
                  )

                  // The option is active if it's in the selected options.
                  const isActive = state[optionNameLowerCase] === value

                  return (
                     <Chip
                        name={option.name}
                        onChange={() => {
                           const newState = updateOption(
                              optionNameLowerCase,
                              value,
                           )
                           updateURL(newState)
                        }}
                        checked={isActive}
                        key={value}
                        aria-disabled={!isAvailableForSale}
                        disabled={!isAvailableForSale}
                        title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                     >
                        {value}
                     </Chip>
                  )
               })}
            </dd>
         </dl>
      </form>
   ))
}
