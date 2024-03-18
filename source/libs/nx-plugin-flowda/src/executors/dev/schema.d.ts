import { z } from 'zod'
import { devExecutorSchema } from './zod-def'

export type TDevExecutorSchema = z.infer<typeof devExecutorSchema>
