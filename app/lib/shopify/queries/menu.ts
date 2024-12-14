import { menuByHandle } from "@/lib/shopify/functions"
import { queryOptions } from "@tanstack/react-query"

export const menuByHandleGraphQLQuery = `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`

export const menuByHandleQuery = (data: { handle: string }) =>
   queryOptions({
      queryKey: ["menu_by_handle", data.handle],
      queryFn: () => menuByHandle({ data }),
   })
