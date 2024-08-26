import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/layout/navbar"
import { getCart } from "@/lib/shopify"
import { GeistSans } from "geist/font/sans"
import { cookies } from "next/headers"
import { type ReactNode, Suspense } from "react"
import "./globals.css"
import CartModal from "@/components/cart/modal"
import Search from "@/components/layout/navbar/search"
import { ModalProvider } from "@/components/modals"
import { Icons } from "@/components/ui/icons"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import * as Portal from "@radix-ui/react-portal"
import Link from "next/link"

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
                  <header className="container flex items-center py-6">
                     <Link
                        href="/"
                        prefetch={true}
                        className="mb-1"
                     >
                        <Icons.logo />
                     </Link>
                     <div className="mx-auto">
                        <Suspense fallback={<>loading..</>}>
                           <Search />
                        </Suspense>
                     </div>
                     <div>
                        <CartModal />
                     </div>
                  </header>
                  <Navbar />
                  <main>{children}</main>
               </TooltipProvider>
            </CartProvider>
         </body>
      </html>
   )
}
