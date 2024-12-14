import {
   productTypeFilterSlugSchema,
   sortFilterSlugSchema,
} from "@/filter/schema"
import { z } from "zod"

export const listCollectionProductsParams = z.object({
   collection: z.string(),
   reverse: z.boolean(),
   sort: sortFilterSlugSchema,
   productTypes: z.array(productTypeFilterSlugSchema),
   minPrice: z.number(),
   maxPrice: z.number(),
})
