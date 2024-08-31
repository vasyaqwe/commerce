import { revalidate } from "@/lib/shopify"
import type { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
   return revalidate(req)
}
