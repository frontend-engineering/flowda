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

export const agFilterSchema = z.record(agFilterInnerSchema.or(agFilterInner2Schema))

export const agSortSchema = z.array(
  z.object({
    colId: z.string(),
    sort: z.enum(['asc', 'desc']),
  }),
)

export const cellRendererInputSchema = z.object({
  value: z.any(),
  // data: z.object({
  //   id: z.union([z.string(), z.number()]).transform(arg => arg.toString())
  // }),
  data: z.unknown(),
  valueFormatted: z.string().nullable(),
  colDef: z.object({
    field: z.string(),
  }),
})
