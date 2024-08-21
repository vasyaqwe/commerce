"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Form from "next/form"
import { useSearchParams } from "next/navigation"

export default function Search() {
   const searchParams = useSearchParams()

   return (
      <Form
         action="/search"
         className="relative w-full w-max-[550px] lg:w-80 xl:w-full"
      >
         <input
            key={searchParams?.get("q")}
            type="text"
            name="q"
            placeholder="Search for products..."
            autoComplete="off"
            defaultValue={searchParams?.get("q") || ""}
            className="w-full rounded-lg border bg-white px-4 py-2 text-black text-md dark:border-neutral-800 dark:bg-transparent dark:placeholder:text-neutral-400 dark:text-white md:text-sm placeholder:text-neutral-500"
         />
         <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
            <MagnifyingGlassIcon className="h-4" />
         </div>
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
