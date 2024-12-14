import type { Product as ProductType } from "@/product/types"
import { cn } from "@/ui/utils"
import { formatCurrency } from "@/utils/format"
import { Link } from "@tanstack/react-router"

export function Product({ product }: { product: ProductType }) {
   return (
      <Link
         className={cn(
            "relative inline-block size-full overflow-hidden rounded-2xl p-0",
         )}
         to={"/product/$handle"}
         params={{ handle: product.handle }}
      >
         <div
            className={cn("relative overflow-hidden rounded-2xl")}
            style={{ aspectRatio: "5/6" }}
         >
            <img
               className="size-full object-cover"
               alt={product.title}
               src={product.featuredImage?.url}
            />
         </div>
         <div className="pt-2">
            <h2 className="font-normal text-foreground/70">{product.title}</h2>
            <p className="mt-1 font-semibold text-xl">
               {formatCurrency(product.priceRange.maxVariantPrice.amount)}{" "}
            </p>
         </div>
      </Link>
   )
}
