import { z } from 'zod'
import { extendZod } from '../../../zod-openapi/index'

extendZod(z)
export * from '../generated/prisma-02/zod/index'

