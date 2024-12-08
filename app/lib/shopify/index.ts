import { isShopifyError } from "@/lib/shopify/utils"
import { getEvent } from "vinxi/http"

export const shopifyFetch = async ({
   headers,
   query,
   variables,
}: {
   headers?: HeadersInit
   query: string
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   variables?: any
}) => {
   const env = getEvent().context.cloudflare.env
   try {
      const result = await fetch(
         `https://${env.SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "X-Shopify-Storefront-Access-Token":
                  env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
               ...headers,
            },
            body: JSON.stringify({
               ...(query && { query }),
               ...(variables && { variables }),
            }),
         },
      )

      const body = await result.json()

      if (body.errors) throw body.errors[0]

      return body.data
   } catch (e) {
      if (isShopifyError(e)) {
         throw {
            cause: e.cause?.toString() || "unknown",
            status: e.status || 500,
            message: e.message,
            query,
         }
      }

      throw {
         error: e,
         query,
      }
   }
}
