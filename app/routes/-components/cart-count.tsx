import { cartByIdQuery } from "@/cart/queries"
import { cn } from "@/ui/utils"
import { useQuery } from "@tanstack/react-query"

export function CartCount() {
   const { data: cart } = useQuery(cartByIdQuery())
   return (
      <span
         aria-hidden={!!cart?.totalQuantity}
         style={{
            transitionTimingFunction: "var(--ease)",
         }}
         className={cn(
            "-top-[4px] -right-[5px] absolute grid size-[18px] scale-0 place-content-center rounded-full bg-accent font-semibold text-xs shadow-xs transition-transform duration-1000 md:top-0.5 md:right-0.5",
            cart?.totalQuantity ? "scale-100" : "",
         )}
      >
         {cart?.totalQuantity ?? 0}
      </span>
   )
}
