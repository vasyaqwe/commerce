"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type ReactNode, useState } from "react"

export function TanstackQueryProvider({ children }: { children: ReactNode }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  retry: false,
                  staleTime: Infinity,
               },
            },
         }),
   )

   return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   )
}
