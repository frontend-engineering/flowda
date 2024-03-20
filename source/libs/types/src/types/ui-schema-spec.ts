import { z } from 'zod'

export type ResourceKey = {
  class_name: string
  display_column: string
  display_name: string
  display_primary_key: boolean
  name: string
  primary_key: string
  searchable_columns: string[] | null
  slug: string
  table_name: string
  visible: boolean
}

export const ResourceKeySchema = z.object({
  class_name: z.string(),
  display_column: z.string(),
  display_name: z.string(),
  display_primary_key: z.boolean(),
  name: z.string(),
  primary_key: z.string(),
  searchable_columns: z.array(z.string()).nullable(),
  slug: z.string(),
  table_name: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<ResourceKey>

export type ColumnKey = {
  access_type: string
  column_source: string
  column_type: string
  display_name: string
  name: string
}

export const ColumnKeySchema = z.object({
  access_type: z.string(),
  column_source: z.string(),
  column_type: z.string(),
  display_name: z.string(),
  name: z.string(),
}) satisfies z.ZodType<ColumnKey>

export type AssociationKey = {
  name: string
  display_name: string
  slug: string
  model_name: string
  foreign_key: string
  primary_key: string
  visible: boolean
}

export const AssociationKeySchema = z.object({
  name: z.string(),
  display_name: z.string(),
  slug: z.string(),
  model_name: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<AssociationKey>

export type ReferenceKey = {
  name: string
  display_name: string
  model_name: string
  reference_type: string
  foreign_key: string
  primary_key: string
}

const ReferenceKeySchema = z.object({
  name: z.string(),
  display_name: z.string(),
  model_name: z.string(),
  reference_type: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
}) satisfies z.ZodType<ReferenceKey>
