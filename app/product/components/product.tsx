import { colorMap } from "@/product/constants"
import { useColorVariant } from "@/product/hooks/use-color-variant"
import type { Product as ProductType } from "@/product/types"
import { cn } from "@/ui/utils"
import { formatCurrency } from "@/utils/format"
import { Link } from "@tanstack/react-router"

export function Product({ product }: { product: ProductType }) {
   const {
      colorOptions,
      images,
      selectedColor,
      setSelectedColor,
      hasMultipleColors,
   } = useColorVariant({ product })

   return (
      <Link
         className={cn("relative inline-block size-full p-0")}
         to={"/product/$handle"}
         params={{ handle: product.handle }}
         search={{ Колір: selectedColor }}
      >
         <div
            className={cn("relative overflow-hidden rounded-2xl")}
            style={{ aspectRatio: "5/6" }}
         >
            {hasMultipleColors ? (
               <img
                  className="size-full object-cover"
                  alt={product.title}
                  src={images[0]?.url}
               />
            ) : (
               <img
                  className="size-full object-cover"
                  alt={product.title}
                  src={product.featuredImage?.url}
               />
            )}
         </div>
         <div className="pt-2">
            <h2 className="font-normal text-foreground/70">{product.title}</h2>
            <p className="mt-1 font-semibold text-xl">
               {formatCurrency(product.priceRange.maxVariantPrice.amount)}{" "}
            </p>
            <div
               className="mt-2 flex cursor-default items-center gap-1"
               onClick={(e) => {
                  e.preventDefault()
               }}
            >
               {!hasMultipleColors ? null : (
                  <>
                     {colorOptions.map((item) => {
                        const color = colorMap[item]
                        return (
                           <div
                              data-selected={item === selectedColor}
                              role="button"
                              onClick={() => {
                                 setSelectedColor(item)
                              }}
                              aria-label={color}
                              key={color}
                              style={{
                                 backgroundColor: color,
                                 borderColor:
                                    color === "#ffffff" ? "#000000" : color,
                                 outlineColor:
                                    color === "#ffffff" ? "#000000" : color,
                              }}
                              className={cn(
                                 "size-[18px] cursor-pointer rounded-full border outline-offset-[1px] hover:opacity-70 data-[selected=true]:outline-[1px]",
                                 color === "Білий" ? "border-foreground" : "",
                              )}
                           />
                        )
                     })}
                  </>
               )}
            </div>
         </div>
      </Link>
   )
}
