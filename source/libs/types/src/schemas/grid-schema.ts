import { z } from 'zod'
import { ColumnUISchema } from '../types'

export const handleContextMenuInputSchema = z.object({
  uri: z.string().describe('所属 Grid 的 uri'),
  value: z.unknown().optional().describe('可选，如果不传则根据 uri/id/field 重新获取'),
  colDef: ColumnUISchema,
})
