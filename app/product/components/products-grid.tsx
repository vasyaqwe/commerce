import { cn } from "@/ui/utils"

export function ProductsGrid({
   className,
   ...props
}: React.ComponentProps<"div">) {
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
