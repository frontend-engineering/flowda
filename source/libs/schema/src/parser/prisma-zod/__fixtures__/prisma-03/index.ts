import { z } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'

extendZodWithOpenApi(z)
export * from '../generated/prisma-03/zod/index'
