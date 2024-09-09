import type { Cart } from "@/cart/types"
import { queryOptions } from "@tanstack/react-query"

export const cartQueryOptions = () =>
   queryOptions({
      queryKey: ["cart"],
      queryFn: async () => {
         const res = await fetch("/api/cart")
         if (!res.ok) return null

         const cart: Cart | undefined = await res.json()

         return cart ?? null
      },
   })
