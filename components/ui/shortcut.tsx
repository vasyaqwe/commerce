"use client"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export const shortcutVariants = cva(
   `ml-auto flex items-center gap-[3px] rounded-md border border-muted/75 dark:bg-muted dark:text-foreground/90 dark:group-hover:bg-foreground/10 bg-background/90 px-1 font-medium font-mono text-muted-foreground tracking-widest shadow-inner dark:border-foreground/5 dark:group-hover:border-foreground/10 group-hover:border-muted group-hover:bg-background/75`,
)

export function Shortcut({
   className,
   children,
   ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
   return (
      <span
         className={cn(shortcutVariants(), className)}
         {...props}
      >
         {children}
      </span>
   )
}
