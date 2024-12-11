import {
   colorFilterSlugs,
   sizeFilterSlugs,
   sortFilterSlugs,
} from "@/lib/shopify/constants"
import { z } from "zod"

export const sortFilterSlugSchema = z.enum(sortFilterSlugs).default("relevance")

export const colorFilterSlugSchema = z.enum(colorFilterSlugs)

export const sizeFilterSlugSchema = z.enum(sizeFilterSlugs)

export const listProductsParams = z.object({
   q: z.string().optional(),
   reverse: z.boolean().optional(),
   sort: sortFilterSlugSchema.optional(),
   colors: z.array(colorFilterSlugSchema).optional(),
   sizes: z.array(sizeFilterSlugSchema).optional(),
   style: z.string().optional(),
})
