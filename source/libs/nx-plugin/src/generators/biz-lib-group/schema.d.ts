import { z } from 'zod'
import { bizLibGroupGeneratorSchema } from './zod-def'

export type BizLibGroupGenerator = z.infer<typeof bizLibGroupGeneratorSchema>
