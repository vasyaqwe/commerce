import {} from "@/lib/shopify/constants"
import {
   colorFilterSlugSchema,
   sizeFilterSlugSchema,
   sortFilterSlugSchema,
} from "@/lib/shopify/schema"
import { Skeleton } from "@/ui/components/skeleton"
import { Outlet, createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

const searchSchema = z.object({
   q: z.string(),
   sort: sortFilterSlugSchema,
   color: z.array(colorFilterSlugSchema),
   size: z.array(sizeFilterSlugSchema),
})

export const Route = createFileRoute("/search/_layout")({
   component: RouteComponent,
   validateSearch: searchSchema.parse,
   pendingComponent: () => {
      return (
         <div className="container">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
               {Array(12)
                  .fill(0)
                  .map((_, index) => {
                     return (
                        <div
                           key={index}
                           className="flex flex-col gap-4"
                        >
                           <Skeleton
                              style={{ aspectRatio: "5/6" }}
                              className="w-full flex-1 rounded-2xl"
                           />
                           <Skeleton className="h-4 w-[50%] rounded-lg" />
                           <Skeleton className="h-6 w-20 rounded-lg" />
                        </div>
                     )
                  })}
            </div>
         </div>
      )
   },
})

function RouteComponent() {
   return (
      <div>
         <Outlet />
      </div>
   )
}
