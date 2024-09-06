import type { Product as ProductType } from "@/lib/shopify/types"
import { cn, formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function Product({ product }: { product: ProductType }) {
   return (
      <Link
         key={product.handle}
         className={cn(
            "relative inline-block h-full w-full overflow-hidden rounded-2xl p-0",
         )}
         href={`/product/${encodeURI(product.handle)}`}
         prefetch={true}
      >
         <div
            className={cn("relative overflow-hidden rounded-2xl")}
            style={{ aspectRatio: "5/6" }}
         >
            <Image
               className="object-cover"
               alt={product.title}
               src={product.featuredImage?.url}
               fill
               sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
         </div>
         <div className="pt-2">
            <h2 className="font-normal opacity-75">{product.title}</h2>
            <p className="mt-1 font-semibold text-lg">
               ₴{formatCurrency(product.priceRange.maxVariantPrice.amount)}{" "}
            </p>
         </div>
      </Link>
   )
}
