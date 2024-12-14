import "@/ui/styles.css"
import { menuByHandleQuery } from "@/lib/shopify/queries"
import { ModalProvider } from "@/modals"
import { Footer } from "@/routes/-components/footer"
import { Header } from "@/routes/-components/header"
import { seo } from "@/seo/utils"
import { Toaster } from "@/ui/components/toast"
import toastStyles from "@/ui/components/toast/styles.css?url"
import { TooltipProvider } from "@/ui/components/tooltip"
import styles from "@/ui/styles.css?url"
import { cn } from "@/ui/utils"
import * as Portal from "@radix-ui/react-portal"
import type { QueryClient } from "@tanstack/react-query"
import {
   Outlet,
   ScrollRestoration,
   createRootRouteWithContext,
} from "@tanstack/react-router"
import { Meta, Scripts } from "@tanstack/start"
import { lazy } from "react"

const _TanStackRouterDevtools = import.meta.env.PROD
   ? () => null
   : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
           default: res.TanStackRouterDevtools,
           // For Embedded Mode
           // default: res.TanStackRouterDevtoolsPanel
        })),
     )

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
}>()({
   head: () => {
      const title = "Commerce"
      const description = ""

      return {
         meta: [
            {
               charSet: "utf-8",
            },
            {
               name: "viewport",
               content:
                  "viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
            },
            { name: "theme-color", content: "#fff" },
            ...seo({
               title,
               description,
            }),
         ],
         links: [
            { rel: "stylesheet", href: styles },
            { rel: "stylesheet", href: toastStyles },
            // { rel: "icon", href: "/favicon.ico" },
            // { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            // { rel: "manifest", href: "/site.webmanifest" },
            {
               rel: "preload",
               href: "/font/manrope.ttf",
               as: "font",
               type: "font/ttf",
               crossOrigin: "anonymous",
            },
         ],
      }
   },
   component: RootComponent,
   loader: ({ context }) => {
      context.queryClient.prefetchQuery(menuByHandleQuery({ handle: "footer" }))
   },
})

function RootComponent() {
   return (
      <RootDocument>
         <Outlet />
      </RootDocument>
   )
}

function RootDocument({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <head>
            <Meta />
         </head>
         <body>
            <div
               className={cn(
                  "grid min-h-svh grid-rows-[auto_1fr_auto] bg-background font-medium text-base text-foreground selection:bg-primary selection:text-background",
               )}
            >
               <TooltipProvider delayDuration={300}>
                  <ModalProvider />
                  <Portal.Root>
                     <Toaster />
                  </Portal.Root>
                  <Header />
                  <main className="min-w-0 pb-20 md:pb-44">{children}</main>
                  <Footer />
               </TooltipProvider>
            </div>
            {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
            {/* <TanStackRouterDevtools position="bottom-right" /> */}
            <ScrollRestoration />
            <Scripts />
            <Toaster />
         </body>
      </html>
   )
}
