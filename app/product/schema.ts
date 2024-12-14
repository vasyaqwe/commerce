import {
   colorFilterSlugSchema,
   productTypeFilterSlugSchema,
   sizeFilterSlugSchema,
   sortFilterSlugSchema,
} from "@/filter/schema"
import { z } from "zod"

export const listProductsParams = z.object({
   q: z.string(),
   reverse: z.boolean(),
   sort: sortFilterSlugSchema,
   productTypes: z.array(productTypeFilterSlugSchema),
   colors: z.array(colorFilterSlugSchema),
   sizes: z.array(sizeFilterSlugSchema),
   minPrice: z.number(),
   maxPrice: z.number(),
})
