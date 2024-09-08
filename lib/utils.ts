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

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
   stringToCheck.startsWith(startsWith)
      ? stringToCheck
      : `${startsWith}${stringToCheck}`

const findError = <T extends object>(error: T): boolean => {
   if (Object.prototype.toString.call(error) === "[object Error]") {
      return true
   }

   const prototype = Object.getPrototypeOf(error) as T | null

   return prototype === null ? false : findError(prototype)
}

const isObject = (object: unknown): object is Record<string, unknown> =>
   typeof object === "object" && object !== null && !Array.isArray(object)

export const isShopifyError = (
   error: unknown,
): error is {
   status: number
   message: Error
   cause?: Error
} => {
   if (!isObject(error)) return false

   if (error instanceof Error) return true

   return findError(error)
}
