import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/layout/navbar"
import { getCart } from "@/lib/shopify"
import { GeistSans } from "geist/font/sans"
import { cookies } from "next/headers"
import type { ReactNode } from "react"
import "./globals.css"
import { ModalProvider } from "@/components/modals"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import * as Portal from "@radix-ui/react-portal"

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
   openGraph: {
      type: "website",
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
         className={cn("font-primary antialiased", GeistSans.variable)}
      >
         <body className="bg-background text-foreground">
            <CartProvider cartPromise={cart}>
               <TooltipProvider delayDuration={300}>
                  <ModalProvider />
                  <Portal.Root>
                     <Toaster />
                  </Portal.Root>
                  <Navbar />
                  <main>{children}</main>
               </TooltipProvider>
            </CartProvider>
         </body>
      </html>
   )
}
