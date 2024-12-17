import type { Product as ProductType } from "@/product/types"
import { cn } from "@/ui/utils"
import { formatCurrency } from "@/utils/format"
import { Link } from "@tanstack/react-router"
import * as React from "react"

const colorMap: Record<string, string> = {
   Білий: "#ffffff", // White
   Чорний: "#000000", // Black
   Червоний: "#ff0000", // Red
   Синій: "#0000ff", // Blue
   Зелений: "#008000", // Green
   Жовтий: "#ffff00", // Yellow
   Сірий: "#808080", // Grey
   Коричневий: "#8b4513", // Brown
   Оранжевий: "#ffa500", // Orange
   Фіолетовий: "#800080", // Purple
   Рожевий: "#ffc0cb", // Pink
   Блакитний: "#add8e6", // Light Blue
   Золотий: "#ffd700", // Gold
   Сріблястий: "#c0c0c0", // Silver
   Лавандовий: "#e6e6fa", // Lavender
   Бірюзовий: "#40e0d0", // Turquoise
   "Темно-синій": "#00008b", // Dark Blue
   "Темно-зелений": "#006400", // Dark Green
   Лимонний: "#fff700", // Lemon
   "Морська хвиля": "#2e8b57", // Sea Green
   Малиновий: "#e30b5d", // Raspberry
   Ліловий: "#d8a7ff", // Lilac
   "Яскраво-червоний": "#ff2400", // Scarlet
   Бежевий: "#f5f5dc", // Beige
   Персиковий: "#ffcc99", // Peach
   Петролевий: "#1d5f7a", // Petrol
   Теракотовий: "#e2725b", // Terracotta
   "М'ятний": "#98ff98", // Mint
   Хакі: "#6b8e23", // Khaki
   Кораловий: "#ff7f50", // Coral
}

export function Product({ product }: { product: ProductType }) {
   const colorOption = product.options.find((option) => option.name === "Колір")
   const [selectedColor, setSelectedColor] = React.useState(
      colorOption?.values[0] ?? "",
   )
   const images = product.images.filter((image) =>
      image.altText.includes(selectedColor),
   )

   const hasMultipleColors = colorOption && colorOption.values.length > 1

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
                     {colorOption.values.map((item) => {
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
