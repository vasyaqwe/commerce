import { z } from "zod"
import { colorFilterSlugs, sizeFilterSlugs, sortFilterSlugs } from "./constants"

export const sortFilterSlugSchema = z.enum(sortFilterSlugs)
export const colorFilterSlugSchema = z.enum(colorFilterSlugs)
export const sizeFilterSlugSchema = z.enum(sizeFilterSlugs)
