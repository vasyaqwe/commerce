import "./globals.css"
import { CartProvider } from "@/components/cart/cart-context"
import { Header } from "@/components/layout/header"
import { ModalProvider } from "@/components/modals"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getCart } from "@/lib/shopify"
import { cn } from "@/lib/utils"
import * as Portal from "@radix-ui/react-portal"
import { GeistSans } from "geist/font/sans"
import { cookies } from "next/headers"
import type { ReactNode } from "react"

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
         <body className="bg-background pb-20 text-base text-foreground">
            <CartProvider cartPromise={cart}>
               <TooltipProvider delayDuration={300}>
                  <ModalProvider />
                  <Portal.Root>
                     <Toaster />
                  </Portal.Root>
                  <Header />
                  <main>{children}</main>
                  {/* <Footer /> */}
               </TooltipProvider>
            </CartProvider>
         </body>
      </html>
   )
}
