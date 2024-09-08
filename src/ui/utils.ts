import { type ClassValue, clsx } from "clsx"
import type { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatCurrency = (amount: string) =>
   new Intl.NumberFormat("en-US", {
      style: "decimal",
   }).format(Number(amount))

export const createUrl = (
   pathname: string,
   params: URLSearchParams | ReadonlyURLSearchParams,
) => {
   const paramsString = params.toString()
   const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

   return `${pathname}${queryString}`
}
