import { cn } from "@/ui/utils"
import type { ComponentProps } from "react"

export function ProductsGrid({ className, ...props }: ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "container grid grid-cols-2 gap-2 lg:grid-cols-4 md:grid-cols-3",
            className,
         )}
         {...props}
      />
   )
}
