import {
   colorFilterSlugs,
   sizeFilterSlugs,
   sortFilterSlugs,
} from "@/lib/shopify/constants"
import { z } from "zod"

export const sortFilterSlugSchema = z.enum(sortFilterSlugs)

export const colorFilterSlugSchema = z.enum(colorFilterSlugs)

export const sizeFilterSlugSchema = z.enum(sizeFilterSlugs)

export const listProductsParams = z.object({
   q: z.string(),
   reverse: z.boolean(),
   sort: sortFilterSlugSchema,
   colors: z.array(colorFilterSlugSchema),
   sizes: z.array(sizeFilterSlugSchema),
   minPrice: z.number(),
   maxPrice: z.number(),
})

export const listCollectionProductsParams = z.object({
   collection: z.string(),
   reverse: z.boolean(),
   sort: sortFilterSlugSchema,
   minPrice: z.number(),
   maxPrice: z.number(),
})
