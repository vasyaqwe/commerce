import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
   return (
      <>
         <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            {Array(12)
               .fill(0)
               .map((_, index) => {
                  return (
                     <div
                        key={index}
                        className="flex flex-col gap-4"
                     >
                        <Skeleton
                           style={{ aspectRatio: "5/4" }}
                           className="w-full flex-1 rounded-2xl"
                        />
                        <Skeleton className="h-6 w-[50%] rounded-lg" />
                        <Skeleton className="h-7 w-20 rounded-lg" />
                     </div>
                  )
               })}
         </div>
      </>
   )
}
