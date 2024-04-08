import { z } from 'zod'
import { ColumnUISchema } from '../types'

export const handleContextMenuInputSchema = z.object({
  colDef: ColumnUISchema,
  value: z.unknown(),
})
