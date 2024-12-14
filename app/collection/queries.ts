import { productFragment } from "@/product/constants"
import { seoFragment } from "@/seo/constants"

const collectionFragment = `
  fragment collection on Collection {
    handle
    title
    description
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
`

export const collectionByHandleGraphQLQuery = `
  query collectionByHandleGraphQLQuery($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`

export const listCollectionsGraphQLQuery = `
  query listCollectionsGraphQLQuery {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`

export const listCollectionProductsGraphQLQuery = `
  query listCollectionProductsGraphQLQuery(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $minPrice: Float
    $maxPrice: Float
  ) {
    collection(handle: $handle) {
      products(sortKey: $sortKey, reverse: $reverse, first: 100, filters: { price: { min: $minPrice, max: $maxPrice } }) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`
