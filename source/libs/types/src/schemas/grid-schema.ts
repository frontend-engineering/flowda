import { z } from 'zod'
import { cellRendererInputSchema } from './ag-grid-schema'
import { AssociationKeySchema, ColumnUISchema } from '../types'

export const handleContextMenuInputSchema = z.object({
  uri: z.string().describe('所属 Grid 的 uri'),
  cellRendererInput: cellRendererInputSchema,
  column: ColumnUISchema.optional(),
  association: AssociationKeySchema.optional(),
})

export const treeGridUriQuerySchema = z.object({
  schemaName: z.string(),
  displayName: z.string(),
  id: z.string(),
  field: z.string(),
})

export const newFormUriOutputSchema = z.object({
  displayName: z.string(),
  schemaName: z.string(),
})
