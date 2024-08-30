import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

import type { ReadonlyURLSearchParams } from "next/navigation"

export const formatCurrency = (amount: string) => {
   const formatter = new Intl.NumberFormat("en-US", {
      style: "decimal",
   })

   return formatter.format(Number(amount))
}

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

export type ShopifyErrorLike = {
   status: number
   message: Error
   cause?: Error
}

const findError = <T extends object>(error: T): boolean => {
   if (Object.prototype.toString.call(error) === "[object Error]") {
      return true
   }

   const prototype = Object.getPrototypeOf(error) as T | null

   return prototype === null ? false : findError(prototype)
}

const isObject = (object: unknown): object is Record<string, unknown> => {
   return (
      typeof object === "object" && object !== null && !Array.isArray(object)
   )
}

export const isShopifyError = (error: unknown): error is ShopifyErrorLike => {
   if (!isObject(error)) return false

   if (error instanceof Error) return true

   return findError(error)
}

export const validateEnvironmentVariables = () => {
   const requiredEnvironmentVariables = [
      "SHOPIFY_STORE_DOMAIN",
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
   ]
   const missingEnvironmentVariables = [] as string[]

   // biome-ignore lint/complexity/noForEach: <explanation>
   requiredEnvironmentVariables.forEach((envVar) => {
      if (!process.env[envVar]) {
         missingEnvironmentVariables.push(envVar)
      }
   })

   if (missingEnvironmentVariables.length) {
      throw new Error(
         `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
            "\n",
         )}\n`,
      )
   }

   if (
      process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
      process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
   ) {
      throw new Error(
         "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.",
      )
   }
}
