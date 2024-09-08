import "../styles/app.css"
import { Footer } from "@/app/_components/footer"
import { Header } from "@/app/_components/header"
import { env } from "@/env"
import { ModalProvider } from "@/modals"
import { ReactQueryProvider } from "@/providers"
import { Toaster } from "@/ui/toast"
import { TooltipProvider } from "@/ui/tooltip"
import { cn } from "@/ui/utils"
import * as Portal from "@radix-ui/react-portal"
import { GeistSans } from "geist/font/sans"
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

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <html
         lang="en"
         className={cn("font-primary antialiased", GeistSans.variable)}
      >
         <body className="grid min-h-svh grid-rows-[auto_1fr_auto] bg-background text-base text-foreground">
            <ReactQueryProvider>
               <TooltipProvider delayDuration={300}>
                  <ModalProvider />
                  <Portal.Root>
                     <Toaster />
                  </Portal.Root>
                  <Header />
                  <main>{children}</main>
                  <Footer />
               </TooltipProvider>
            </ReactQueryProvider>
         </body>
      </html>
   )
}
