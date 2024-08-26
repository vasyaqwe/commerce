import { AddToCart } from "@/components/cart/add-to-cart"
import { Prose } from "@/components/ui/prose"
import type { Product } from "@/lib/shopify/types"
import { VariantSelector } from "./variant-selector"

export function ProductDescription({ product }: { product: Product }) {
   return (
      <>
         <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 font-medium text-5xl">{product.title}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm">
               <p>{product.priceRange.maxVariantPrice.amount}</p>
            </div>
         </div>
         <VariantSelector
            options={product.options}
            variants={product.variants}
         />
         {product.descriptionHtml ? (
            <Prose
               className="mb-6 text-sm leading-tight"
               html={product.descriptionHtml}
            />
         ) : null}
         <AddToCart product={product} />
      </>
   )
}
