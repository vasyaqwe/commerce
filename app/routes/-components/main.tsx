import { cn } from "@/ui/utils"

export function Main({
   className,
   children,
   ...props
}: React.ComponentProps<"main">) {
   return (
      <main
         className={cn("min-w-0 pb-20 md:min-h-[90vh] md:pb-44", className)}
         {...props}
      >
         {children}
      </main>
   )
}
