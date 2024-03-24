import { z } from 'zod'
import { extendZod } from '../../../zod-openapi'
import '../../__tests__/utils/schema-legacy'

extendZod(z)

export * from '../generated/prisma-03/zod/index'
