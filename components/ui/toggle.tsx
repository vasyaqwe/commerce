"use client"

import { cn } from "@/lib/utils"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

const toggleVariants = cva(
   "inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
   {
      variants: {
         variant: {
            default:
               "bg-transparent data-[state=on]:bg-border/75 hover:bg-border/75",
            secondary: `transition-none bg-muted/25 font-medium text-muted-foreground hover:bg-brand/10 hover:text-brand data-[state=on]:bg-brand/10 data-[state=on]:text-brand`,
            outline:
               "border bg-background text-foreground/75 shadow-sm transition-all data-[state=on]:brightness-[98%] hover:brightness-[98%]",
         },
         size: {
            default: "h-9 rounded-[10px] px-2.5 px-3 md:h-8 md:rounded-lg",
            sm: "h-[30px] px-2",
            lg: "h-9 px-3",
            "with-icon":
               "h-[51px] flex-col gap-[3px] rounded-lg px-3 py-1.5 text-[0.785rem] leading-[1.25]",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
)

const Toggle = React.forwardRef<
   React.ElementRef<typeof TogglePrimitive.Root>,
   React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
      VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
   <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
   />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
