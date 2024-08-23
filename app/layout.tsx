import { CartProvider } from "components/cart/cart-context"
import { Navbar } from "components/layout/navbar"
import { GeistSans } from "geist/font/sans"
import { getCart } from "lib/shopify"
import { cookies } from "next/headers"
import type { ReactNode } from "react"
import { Toaster } from "sonner"
import "./globals.css"

const { SITE_NAME } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
   ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
   : "http://localhost:3000"

export const metadata = {
   metadataBase: new URL(baseUrl),
   title: {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      default: SITE_NAME!,
      template: `%s | ${SITE_NAME}`,
   },
   robots: {
      follow: true,
      index: true,
   },
}

export default async function RootLayout({
   children,
}: { children: ReactNode }) {
   const cartId = cookies().get("cartId")?.value
   // Don't await the fetch, pass the Promise to the context provider
   const cart = getCart(cartId)

   return (
      <html
         lang="en"
         className={GeistSans.variable}
      >
         <body className="bg-neutral-50 text-black dark:bg-neutral-900 dark:selection:bg-pink-500 selection:bg-teal-300 dark:selection:text-white dark:text-white">
            <CartProvider cartPromise={cart}>
               <Navbar />
               <main>
                  {children}
                  <Toaster closeButton />
               </main>
            </CartProvider>
         </body>
      </html>
   )
}
