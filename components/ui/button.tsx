"use client"

import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { type ComponentProps, forwardRef } from "react"

const buttonVariants = cva(
   `relative inline-flex items-center justify-center font-medium transition-all gap-1.5 leading-none overflow-hidden active:enabled:scale-95 duration-200 whitespace-nowrap focus-visible:ring-1 ring-offset-[1px] focus-visible:ring-accent/80 focus-visible:outline-accent/30 outline outline-3 outline-transparent outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed`,
   {
      variants: {
         variant: {
            default: `bg-primary/90 shadow-sm hover:enabled:shadow-lg border border-transparent focus-visible:ring-accent text-primary-foreground/95 hover:enabled:bg-primary disabled:bg-border disabled:text-foreground disabled:border-foreground/[0.12] active:enabled:shadow-md hover:enabled:text-primary-foreground`,
            secondary: `bg-muted/70 font-medium text-muted-foreground hover:enabled:bg-muted data-[state=open]:bg-muted dark:bg-muted/50 dark:data-[state=open]:bg-muted dark:hover:enabled:bg-muted hover:enabled:text-foreground/95 data-[state=open]:text-foreground/85 dark:shadow-md`,
            "secondary-primary": `bg-muted font-medium text-muted-foreground hover:enabled:bg-primary/10 hover:enabled:text-primary`,
            "secondary-destructive": `bg-destructive/20 font-medium hover:enabled:bg-destructive/15 text-destructive hover:enabled:text-destructive/90`,
            outline: `bg-background dark:bg-muted dark:border-foreground/[0.07] border border-transparent text-foreground data-[state=open]:border-border/60 hover:enabled:border-border/60 shadow-button`,
            destructive: `bg-destructive/90 hover:enabled:bg-destructive text-destructive-foreground/90 hover:enabled:text-destructive-foreground`,
            ghost: "border border-transparent aria-[current=page]:bg-muted dark:hover:enabled:bg-border hover:enabled:bg-muted/70",
            link: "!h-auto !rounded-none !p-0 text-foreground/70 underline transition-none hover:enabled:text-foreground",
         },
         size: {
            default: "h-[42px] rounded-xl px-4 text-[0.975rem]",
            sm: "h-[32px] rounded-lg px-2.5 text-sm",
            lg: "h-[38px] gap-2 rounded-lg px-4 text-[0.9325rem]",
            xl: "h-[48px] gap-3 rounded-xl px-4 text-[1.025rem]",
            icon: "size-[42px] gap-0 rounded-xl",
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

type ButtonProps = ComponentProps<"button"> &
   VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, ...props }, ref) => {
      return (
         <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
         />
      )
   },
)

export { Button, type ButtonProps, buttonVariants }
