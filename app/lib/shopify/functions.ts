import { shopifyFetch } from "@/lib/shopify"
import { menuByHandleGraphQLQuery } from "@/lib/shopify/queries"
import {
   listPagesGraphQLQuery,
   pageByHandleGraphQLQuery,
} from "@/lib/shopify/queries"
import type { Connection, Page } from "@/lib/shopify/types"
import { removeEdgesAndNodes } from "@/lib/shopify/utils"
import { createServerFn } from "@tanstack/start"
import { zodValidator } from "@tanstack/zod-adapter"
import { getEvent } from "vinxi/http"
import { z } from "zod"

export const menuByHandle = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: menuByHandleGraphQLQuery,
         variables: {
            handle: data.handle,
         },
      })) as {
         menu?: {
            items: {
               title: string
               url: string
            }[]
         }
      }
      const env = getEvent().context.cloudflare.env

      return (
         res?.menu?.items.map((item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url
               .replace(`https://${env.SHOPIFY_STORE_DOMAIN}`, "")
               .replace("/collections", "/search")
               .replace("/policies", "")
               .replace("/pages", ""),
         })) ?? []
      )
   })

export const pageByHandle = createServerFn({ method: "GET" })
   .validator(
      zodValidator(
         z.object({
            handle: z.string(),
         }),
      ),
   )
   .handler(async ({ data }) => {
      const res = (await shopifyFetch({
         query: pageByHandleGraphQLQuery,
         variables: { handle: data.handle },
      })) as { pageByHandle: Page | undefined }

      return res.pageByHandle ?? null
   })

export const listPages = createServerFn({ method: "GET" }).handler(async () => {
   const res = (await shopifyFetch({
      query: listPagesGraphQLQuery,
   })) as {
      pages: Connection<Page>
   }

   return removeEdgesAndNodes(res.pages)
})
