import "./styles/app.css"
import { Footer } from "@/app/_components/footer"
import { Header } from "@/app/_components/header"
import { ModalProvider } from "@/components/modals"
import { TanstackQueryProvider } from "@/components/providers"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { env } from "@/config"
import { cn } from "@/lib/utils"
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
         className={cn("light font-primary antialiased", GeistSans.variable)}
      >
         <body className="grid min-h-svh grid-rows-[auto_1fr_auto] bg-background text-base text-foreground">
            <TanstackQueryProvider>
               <TooltipProvider delayDuration={300}>
                  <ModalProvider />
                  <Portal.Root>
                     <Toaster />
                  </Portal.Root>
                  <Header />
                  <main>{children}</main>
                  <Footer />
               </TooltipProvider>
            </TanstackQueryProvider>
         </body>
      </html>
   )
}
