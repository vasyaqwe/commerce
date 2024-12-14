import type { Connection } from "@/lib/shopify/types"

export const removeEdgesAndNodes = <T>(array: Connection<T>): T[] =>
   array.edges.map((edge) => edge?.node)

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
