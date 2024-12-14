import { z } from "zod"
import {
   colorFilterSlugs,
   productTypeFilterSlugs,
   sizeFilterSlugs,
   sortFilterSlugs,
} from "./constants"

export const sortFilterSlugSchema = z.enum(sortFilterSlugs)
export const productTypeFilterSlugSchema = z.enum(productTypeFilterSlugs)
export const colorFilterSlugSchema = z.enum(colorFilterSlugs)
export const sizeFilterSlugSchema = z.enum(sizeFilterSlugs)
