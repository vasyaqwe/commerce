import { cn } from "@/ui/utils"
import type { ComponentProps } from "react"

export function PageDescription({
   className,
   children,
   ...props
}: ComponentProps<"div">) {
   return (
      <div
         className={cn(
            "mb-4 flex h-[68px] items-center justify-center bg-border/25 md:mb-8 md:h-[82px]",
            className,
         )}
         {...props}
      >
         {children}
      </div>
   )
}

export function PageDescriptionHeading({
   children,
   className,
   ...props
}: ComponentProps<"h1">) {
   return (
      <h1
         className={cn("font-semibold text-xl", className)}
         {...props}
      >
         {children}
      </h1>
   )
}
