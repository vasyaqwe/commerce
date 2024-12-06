import { queryOptions } from "@tanstack/react-query"
import * as cart from "./functions"

export const getCartQueryOptions = () =>
   queryOptions({
      queryKey: ["get_cart"],
      queryFn: () => cart.get(),
   })
