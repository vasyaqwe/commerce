import type { Cart, CartItem, ShopifyCart } from "@/cart/types"
import type { Product, ProductVariant } from "@/lib/shopify/types"
import { removeEdgesAndNodes } from "@/lib/shopify/utils"

export const reshapeCart = (cart: ShopifyCart): Cart => {
   if (!cart.cost?.totalTaxAmount) {
      cart.cost.totalTaxAmount = {
         amount: "0.0",
         currencyCode: "USD",
      }
   }

   return {
      ...cart,
      lines: removeEdgesAndNodes(cart.lines),
   }
}

export const calculateItemCost = (quantity: number, price: string) =>
   (Number(price) * quantity).toString()

export const createOrUpdateCartItem = (
   existingItem: CartItem | undefined,
   variant: ProductVariant,
   product: Product,
): CartItem => {
   const quantity = existingItem ? existingItem.quantity + 1 : 1
   const totalAmount = calculateItemCost(quantity, variant.price.amount)

   return {
      id: existingItem?.id,
      quantity,
      cost: {
         totalAmount: {
            amount: totalAmount,
            currencyCode: variant.price.currencyCode,
         },
      },
      merchandise: {
         id: variant.id,
         title: variant.title,
         selectedOptions: variant.selectedOptions,
         product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            featuredImage: product.featuredImage,
         },
      },
   }
}

export const updateCartTotals = (
   lines: CartItem[],
): Pick<Cart, "totalQuantity" | "cost"> => {
   const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0)
   const totalAmount = lines.reduce(
      (sum, item) => sum + Number(item.cost.totalAmount.amount),
      0,
   )
   const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD"

   return {
      totalQuantity,
      cost: {
         subtotalAmount: { amount: totalAmount.toString(), currencyCode },
         totalAmount: { amount: totalAmount.toString(), currencyCode },
         totalTaxAmount: { amount: "0", currencyCode },
      },
   }
}
