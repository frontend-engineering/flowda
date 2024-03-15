import { z } from 'zod'
import { extendZodWithOpenApi } from '../../../zod-openapi'

extendZodWithOpenApi(z)
export * from './prisma/generated/zod/index'
