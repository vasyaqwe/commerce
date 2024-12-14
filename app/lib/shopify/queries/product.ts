import productFragment from "../fragments/product"

export const productByHandleGraphQLQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`

export const listProductsGraphQLQuery = `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
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
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`

export const listFavoriteProductsGraphQLQuery = `
  query getFavoriteProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        ...product
      }
    }
  }
  ${productFragment}
`
