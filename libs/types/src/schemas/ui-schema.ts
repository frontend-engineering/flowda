import { z } from 'zod'
import { agFilterSchema, agSortSchema } from './ag-filter-schema'

export const selectOptionSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string(),
})

export const resourceColumnSchema = z.object({
  name: z.string(),
  access_type: z.enum(['read_only']).optional(),
  column_type: z.enum(['reference', 'string', 'tag', 'integer', 'datetime', 'textarea', 'boolean']),
  prisma: z.boolean().optional(),
  format: z
    .object({
      select_options: selectOptionSchema.array(),
    })
    .optional(),
  reference: z.object({
    model_name: z.string(),
    primary_key: z.string(),
    display_name: z.string(),
    display_column: z.union([z.string(), z.array(z.string()), z.undefined()]),
    'x-relationField': z.string(),
    'x-onSoftDelete': z.string(),
    'x-unique': z.boolean().optional(),
  }),
  display_name: z.string().optional(),
  validators: z.array(
    z.union([
      z.object({
        required: z.boolean(),
      }),
      z.object({
        format: z.string(),
        message: z.string(),
      }),
    ]),
  ),
})

export const resourceAssociationSchema = z.object({
  foreign_key: z.string(),
  model_name: z.string(),
  primary_key: z.string(),
  name: z.string(),
  slug: z.string(),
  display_name: z.string(),
  schema_name: z.string(),
})

export const resourceSchema = z.object({
  namespace: z.string().optional(),
  prisma: z.boolean().optional(),
  is_dynamic: z.boolean().optional(),
  schema_name: z.string(),
  name: z.string(),
  slug: z.string(),
  primary_key: z.string(),
  custom: z.any(),
  display_column: z.union([z.string(), z.array(z.string()), z.undefined()]),
  display_name: z.string().nullable(),
  display_primary_key: z.boolean(),
  searchable_columns: z.array(z.string()).optional(),
  columns: resourceColumnSchema.array(),
  associations: resourceAssociationSchema.array(),
})

export const getResourceInputSchema = z.object({
  schemaName: z.string(),
})

export const getResourceDataInputSchema = z.object({
  schemaName: z.string(),
  id: z.number().optional(),
  current: z.number(),
  pageSize: z.number(),
  sort: agSortSchema,
  filterModel: agFilterSchema,
})

export const getResourceDataOutputInnerSchema = z.object({
  pagination: z.object({
    total: z.number()
  }),
  data: z.array(z.any()),
})

export const getResourceDataOutputSchema = z.union([
  getResourceDataOutputInnerSchema, z.unknown(),
])

export const putResourceDataInputSchema = z.object({
  schemaName: z.string(),
  id: z.number(),
  updatedValue: z.any(),
})
