import { productFragment } from "./constants"

export const productByHandleGraphQLQuery = `
  query productByHandleGraphQLQuery($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`

export const listProductsGraphQLQuery = `
  query listProductsGraphQLQuery($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`

export const listProductRecommendationsGraphQLQuery = `
  query listProductRecommendationsGraphQLQuery($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`
