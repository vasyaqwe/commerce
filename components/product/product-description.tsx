import { AddToCart } from "@/components/cart/add-to-cart"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/shopify/types"
import { formatCurrency } from "@/lib/utils"
import { HeartIcon, TruckIcon } from "@heroicons/react/24/outline"
import { VariantSelector } from "./variant-selector"

export function ProductDescription({ product }: { product: Product }) {
   return (
      <>
         <div className="flex flex-col">
            <h1 className="mb-2 font-semibold text-2xl lg:text-3xl">
               {product.title}
            </h1>
            <p className="text-foreground/70 lg:mt-2 ">42 reviews</p>
            <p className="mt-4 font-bold text-2xl lg:mt-8 lg:text-3xl">
               ₴{formatCurrency(product.priceRange.maxVariantPrice.amount)}
            </p>
         </div>
         <hr className="my-3 lg:my-6" />
         <VariantSelector
            options={product.options}
            variants={product.variants}
         />
         <div className="flex w-full items-center gap-2.5 lg:gap-4">
            <AddToCart product={product} />
            <Button
               aria-label="Favorite"
               className="size-12 shrink-0 lg:size-[3.75rem] lg:rounded-2xl"
               variant={"secondary"}
               size={"icon"}
            >
               <HeartIcon
                  className="size-6"
                  strokeWidth={2}
               />
            </Button>
         </div>
         <p className="mt-8 flex items-center gap-2 font-medium text-sm">
            <TruckIcon className="-mt-0.5 size-6" /> Free Shipping on orders
            over $50
         </p>
      </>
   )
}
