import "./styles/app.css"
import { Footer } from "@/app/_components/footer"
import { Header } from "@/app/_components/header"
import { CartProvider } from "@/components/cart/cart-context"
import { ModalProvider } from "@/components/modals"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { env } from "@/lib/constants"
import { getCart } from "@/lib/shopify"
import { cn } from "@/lib/utils"
import * as Portal from "@radix-ui/react-portal"
import { GeistSans } from "geist/font/sans"
import { cookies } from "next/headers"
import type { ReactNode } from "react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
   ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
   : "http://localhost:3000"

export const metadata = {
   metadataBase: new URL(baseUrl),
   title: {
      default: env.SITE_NAME,
      template: `%s | ${env.SITE_NAME}`,
   },
   openGraph: {
      type: "website",
   },
   robots: {
      follow: true,
      index: true,
   },
}

export const runtime = "edge"

export default function Layout({ children }: { children: ReactNode }) {
   const cartId = cookies().get("cartId")?.value
   const cart = getCart(cartId)

   return (
      <html
         lang="en"
         className={cn("light font-primary antialiased", GeistSans.variable)}
      >
         <body className="grid min-h-svh grid-rows-[auto_1fr_auto] bg-background text-base text-foreground">
            <CartProvider cartPromise={cart}>
               <TooltipProvider delayDuration={300}>
                  <ModalProvider />
                  <Portal.Root>
                     <Toaster />
                  </Portal.Root>
                  <Header />
                  <main>{children}</main>
                  <Footer />
               </TooltipProvider>
            </CartProvider>
         </body>
      </html>
   )
}
