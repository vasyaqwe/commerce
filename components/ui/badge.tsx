"use client"

import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

const badgeVariants = cva(
   "inline-block inline-flex min-h-[26px] items-center justify-center rounded-full border px-2 font-medium leading-none",
   {
      variants: {
         variant: {
            default: `border-primary/10 bg-accent bg-primary/15 text-accent-foreground text-primary`,
         },
         size: {
            default: "h-7 px-2",
            sm: "h-6 rounded-sm",
            lg: "h-10 rounded-md px-8",
            icon: "size-6 justify-center gap-0 px-1",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
)

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
   VariantProps<typeof badgeVariants>

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
   ({ className, variant, size, ...props }, ref) => {
      const Comp = "span"
      return (
         <Comp
            className={cn(badgeVariants({ variant, size, className }))}
            ref={ref}
            {...props}
         />
      )
   },
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
