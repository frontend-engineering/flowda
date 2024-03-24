import { z } from 'zod'
import { extendZod } from '../../../zod-openapi/index'

extendZod(z)
export * from '../generated/prisma-03/zod/index'
