import { cn } from "@/ui/utils"
import type { ComponentProps } from "react"

export function Main({
   className,
   children,
   ...props
}: ComponentProps<"main">) {
   return (
      <main
         className={cn("min-w-0 pb-20 md:min-h-[90vh] md:pb-44", className)}
         {...props}
      >
         {children}
      </main>
   )
}
