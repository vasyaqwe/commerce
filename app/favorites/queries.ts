import { listFavoriteProducts } from "@/favorites/functions"
import { productFragment } from "@/product/constants"
import { queryOptions } from "@tanstack/react-query"

export const listFavoriteProductsGraphQLQuery = `
  query listFavoriteProductsGraphQLQuery($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        ...product
      }
    }
  }
  ${productFragment}
`

export const listFavoriteIdsQuery = () =>
   queryOptions({
      queryKey: ["favorite_ids"],
      queryFn: () => {
         const favorites = JSON.parse(
            localStorage.getItem("favorite_ids") ?? "[]",
         )

         return favorites as string[]
      },
   })

export const listFavoritesQuery = () =>
   queryOptions({
      queryKey: ["favorites"],
      queryFn: async () => {
         const favoriteIds = JSON.parse(
            localStorage.getItem("favorite_ids") ?? "[]",
         )

         return await listFavoriteProducts({ data: { ids: favoriteIds } })
      },
   })
