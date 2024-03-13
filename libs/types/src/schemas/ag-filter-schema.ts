import { z } from 'zod'

export const agFilterInnerSchema = z.object({
  filterType: z.enum(['text', 'number']),
  // filterType: z.string(),
  type: z.enum(['contains', 'equals']),
  // type: z.string(),
  filter: z.union([z.string(), z.number()]),
})

export const agFilterInner2Schema = z.object({
  filterType: z.enum(['text']),
  // filterType: z.string(),
  operator: z.enum(['OR', 'AND']),
  // operator: z.string(),
  conditions: z.array(agFilterInnerSchema),
})

export const agFilterSchema = z
  .record(agFilterInnerSchema.or(agFilterInner2Schema))
  .or(z.object({ _ref: z.string().optional() }))

export const agSortSchema = z.array(
  z.object({
    colId: z.string(),
    sort: z.enum(['asc', 'desc']),
  }),
)

export const callRendererInputSchema = z.object({
  value: z.union([z.string(), z.number()]),
  colDef: z.object({
    field: z.string(),
  }),
})
