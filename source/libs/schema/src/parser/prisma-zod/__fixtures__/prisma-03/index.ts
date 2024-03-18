import { z } from 'zod'
import { extendZodWithOpenApi } from '../../../zod-openapi'

extendZodWithOpenApi(z)
export * from '../generated/prisma-03/zod/index'
