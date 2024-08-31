import { Button } from "@/components/ui/button"
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function Page() {
   return (
      <div className=" p-10">
         <div className="flex flex-wrap gap-3">
            <Button>Add to cart</Button>
            <Button
               size={"icon"}
               variant={"secondary"}
            >
               <HeartIcon
                  className="size-5"
                  strokeWidth={2}
               />
            </Button>
            <Button
               size={"icon"}
               variant={"ghost"}
            >
               <HeartIcon
                  className="size-5"
                  strokeWidth={2}
               />
            </Button>
            <Button variant={"outline"}>
               <HeartIcon
                  className="size-5"
                  strokeWidth={2}
               />
               Add to cart
            </Button>
            <Button variant={"secondary"}>
               <HeartIcon
                  className="size-5"
                  strokeWidth={2}
               />
               Like this
            </Button>
            <Button variant={"secondary-destructive"}>
               <TrashIcon
                  className="size-5"
                  strokeWidth={2}
               />
               Trash this
            </Button>
            <Button
               size={"icon"}
               variant={"destructive"}
            >
               <TrashIcon
                  className="size-5"
                  strokeWidth={2}
               />
            </Button>
         </div>
      </div>
   )
}
