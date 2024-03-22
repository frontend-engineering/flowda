import { z } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'

export function extendZod(zod: typeof z, forceOverride = false) {
  extendZodWithOpenApi(zod, forceOverride)
}
