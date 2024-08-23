"use client"

import { cn } from "@/lib/utils"

function Skeleton({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         className={cn(
            `before:-translate-x-full relative overflow-hidden rounded-xl bg-border/50 before:absolute before:inset-0 before:animate-[shimmer_1.75s_infinite] before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent`,
            className,
         )}
         {...props}
      />
   )
}

export { Skeleton }
