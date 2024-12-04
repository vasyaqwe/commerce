import { cn } from "@/ui/utils"
import { cva } from "class-variance-authority"

export const kbdVariants = cva(
   `ml-auto flex items-center gap-[3px] rounded-md border border-muted/75 bg-background/90 px-1 font-medium font-mono text-muted-foreground tracking-widest shadow-inner group-hover:border-muted group-hover:bg-background/75`,
)

export function Kbd({
   className,
   children,
   ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
   return (
      <kbd
         className={cn(kbdVariants(), className)}
         {...props}
      >
         {children}
      </kbd>
   )
}
