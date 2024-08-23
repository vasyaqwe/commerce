"use client"

import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Form from "next/form"
import { useSearchParams } from "next/navigation"

export default function Search() {
   const searchParams = useSearchParams()

   return (
      <Form
         action="/search"
         className="relative w-full max-w-[400px] lg:w-80 xl:w-full"
      >
         <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-6 text-foreground/45" />
         <Input
            key={searchParams?.get("q")}
            className="pl-11"
            type="text"
            name="q"
            placeholder="Search"
            autoComplete="off"
            defaultValue={searchParams?.get("q") || ""}
         />
      </Form>
   )
}

export function SearchSkeleton() {
   return (
      <form className="relative w-full w-max-[550px] lg:w-80 xl:w-full">
         <input
            placeholder="Search for products..."
            className="w-full rounded-lg border bg-white px-4 py-2 text-black text-sm dark:border-neutral-800 dark:bg-transparent dark:placeholder:text-neutral-400 dark:text-white placeholder:text-neutral-500"
         />
         <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
            <MagnifyingGlassIcon className="h-4" />
         </div>
      </form>
   )
}
