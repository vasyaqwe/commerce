import type { Cart } from "@/lib/shopify/types"
import { queryOptions } from "@tanstack/react-query"

export const cartQueryOptions = () =>
   queryOptions({
      queryKey: ["cart"],
      queryFn: async () => {
         const res = await fetch("/api/cart")
         if (!res.ok) return null
         return (await res.json()) as Cart
      },
   })
