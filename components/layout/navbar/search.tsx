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
         className="relative w-full max-w-[400px]"
      >
         <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 left-3 size-6 text-foreground/35" />
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
