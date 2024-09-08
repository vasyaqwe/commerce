import { getCollections, getPages, getProducts } from "@/lib/shopify"
import type { MetadataRoute } from "next"

type Route = {
   url: string
   lastModified: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
   ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
   : "http://localhost:3000"

export const dynamic = "force-dynamic"

const validateEnvironmentVariables = () => {
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   validateEnvironmentVariables()

   const routesMap = [""].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
   }))

   const collectionsPromise = getCollections().then((collections) =>
      collections.map((collection) => ({
         url: `${baseUrl}${collection.path}`,
         lastModified: collection.updatedAt,
      })),
   )

   const productsPromise = getProducts({}).then((products) =>
      products.map((product) => ({
         url: `${baseUrl}/product/${product.handle}`,
         lastModified: product.updatedAt,
      })),
   )

   const pagesPromise = getPages().then((pages) =>
      pages.map((page) => ({
         url: `${baseUrl}/${page.handle}`,
         lastModified: page.updatedAt,
      })),
   )

   let fetchedRoutes: Route[] = []

   try {
      fetchedRoutes = (
         await Promise.all([collectionsPromise, productsPromise, pagesPromise])
      ).flat()
   } catch (error) {
      throw JSON.stringify(error, null, 2)
   }

   return [...routesMap, ...fetchedRoutes]
}
