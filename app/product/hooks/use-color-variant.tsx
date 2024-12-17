import type { Product } from "@/product/types"
import * as React from "react"

export function useColorVariant({ product }: { product: Product }) {
   const colorVariant = product?.options.find(
      (option) => option.name === "Колір",
   )
   const colorOptions = colorVariant?.values ?? []
   const [selectedColor, setSelectedColor] = React.useState(
      colorVariant?.values[0] ?? "",
   )
   const images =
      product?.images.filter((image) =>
         image.altText.includes(selectedColor),
      ) ?? []

   const hasMultipleColors = colorVariant && colorOptions.length > 1

   return {
      colorOptions,
      images,
      selectedColor,
      setSelectedColor,
      hasMultipleColors,
   }
}
