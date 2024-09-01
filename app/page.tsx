"use client"

import { Button } from "@/components/ui/button"
import {
   Combobox,
   ComboboxClearButton,
   ComboboxContent,
   ComboboxDisclosure,
   ComboboxEmpty,
   ComboboxInput,
   ComboboxItem,
   ComboboxSelectedItems,
   ComboboxTrigger,
} from "@/components/ui/combobox"
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"

export default function Page() {
   return (
      <div className=" p-10">
         <div className="flex flex-wrap gap-3">
            <Combobox
               defaultValue={["book-1", "book-2"]}
               multiple
            >
               <ComboboxTrigger className="w-[250px]">
                  <ComboboxSelectedItems />
                  <ComboboxInput placeholder="Pick a book" />
                  <ComboboxClearButton />
                  <ComboboxDisclosure />
               </ComboboxTrigger>
               <ComboboxContent className="h-[280px] w-[255px]">
                  <ComboboxEmpty>No results found</ComboboxEmpty>
                  <ComboboxItem value="book-1">
                     To Kill a Mockingbird
                  </ComboboxItem>
                  <ComboboxItem value="book-2">War and Peace</ComboboxItem>
                  <ComboboxItem value="book-3">The Idiot</ComboboxItem>
                  <ComboboxItem value="book-4">
                     A Picture of Dorian Gray
                  </ComboboxItem>
                  <ComboboxItem value="book-5">1984</ComboboxItem>
                  <ComboboxItem value="book-6">
                     Pride and Prejudice but it is an extremely long title
                  </ComboboxItem>
               </ComboboxContent>
            </Combobox>
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
