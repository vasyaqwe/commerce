import { menuByHandle } from "@/lib/shopify/functions"
import { seoFragment } from "@/seo/constants"
import { queryOptions } from "@tanstack/react-query"

export const menuByHandleGraphQLQuery = `
  query menuByHandleGraphQLQuery($handle: String!) {
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

const pageFragment = `
  fragment page on Page {
    ... on Page {
      id
      title
      handle
      body
      bodySummary
      seo {
        ...seo
      }
      createdAt
      updatedAt
    }
  }
  ${seoFragment}
`

export const pageByHandleGraphQLQuery = `
  query pageByHandleGraphQLQuery($handle: String!) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`

export const listPagesGraphQLQuery = `
  query listPagesGraphQLQuery {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`
