import { z } from 'zod'
import { agFilterSchema, agSortSchema } from './ag-grid-schema'

export const getResourceInputSchema = z.object({
  tenant: z.string(),
  schemaName: z.string(),
})

export const findManyResourceDataInputSchema = z.object({
  tenant: z.string(),
  schemaName: z.string(),
  current: z.number(),
  pageSize: z.number(),
  sort: agSortSchema,
  filterModel: agFilterSchema,
})

export const findUniqueResourceDataInputSchema = z.object({
  tenant: z.string(),
  schemaName: z.string(),
  id: z.number(),
})

export const getResourceDataInputSchema = z.union([findManyResourceDataInputSchema, findUniqueResourceDataInputSchema])

export const getResourceDataOutputInnerSchema = z.object({
  pagination: z.object({
    total: z.number(),
  }),
  data: z.array(z.any()),
})

export const getResourceDataOutputSchema = z.union([getResourceDataOutputInnerSchema, z.unknown()])

export const putResourceDataInputSchema = z.object({
  tenant: z.string(),
  schemaName: z.string(),
  id: z.number(),
  updatedValue: z.any(),
})
