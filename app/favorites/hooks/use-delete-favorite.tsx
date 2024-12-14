import { listFavoriteIdsQuery, listFavoritesQuery } from "@/favorites/queries"
import { useLocalStorage } from "@/interactions/use-local-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteFavorite() {
   const queryClient = useQueryClient()
   const [_favorites, setFavorites] = useLocalStorage<string[]>(
      "favorite_ids",
      [],
   )

   const deleteFavorite = useMutation({
      mutationFn: async (id: string) => {
         return setFavorites((prev) => prev.filter((prevId) => prevId !== id))
      },
      onSettled: () => {
         queryClient.invalidateQueries(listFavoriteIdsQuery())
         queryClient.invalidateQueries(listFavoritesQuery())
      },
   })

   return { deleteFavorite }
}
