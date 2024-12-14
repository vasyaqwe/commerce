import { listFavoriteIdsQuery, listFavoritesQuery } from "@/favorites/queries"
import { useLocalStorage } from "@/interactions/use-local-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useInsertFavorite() {
   const queryClient = useQueryClient()
   const [_favorites, setFavorites] = useLocalStorage<string[]>(
      "favorite_ids",
      [],
   )

   const insertFavorite = useMutation({
      mutationFn: async (id: string) => {
         return setFavorites((prev) => [...new Set([...prev, id])])
      },
      onSettled: () => {
         queryClient.invalidateQueries(listFavoriteIdsQuery())
         queryClient.invalidateQueries(listFavoritesQuery())
      },
   })

   return { insertFavorite }
}
