import { z } from 'zod'
import { cellRendererInputSchema } from './ag-grid-schema'
import { ColumnUISchema } from '../types'

export const handleContextMenuInputSchema = z.object({
  uri: z.string().describe('所属 Grid 的 uri'),
  cellRendererInput: cellRendererInputSchema,
  column: ColumnUISchema
})
