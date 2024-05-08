import { z } from 'zod'

export interface PluginType {
  [x: string]: unknown
}

export type ColumnKey = {
  column_type: string
  display_name: string
  description?: string
  example?: string
  visible: boolean
  access_type?: 'read_only' | 'read_write'
  plugins?: Partial<PluginType>
}
export const ColumnKeySchema = z.object({
  column_type: z.string(),
  display_name: z.string(),
  description: z.string().optional(),
  example: z.string().optional(),
  visible: z.boolean(),
  access_type: z.union([z.literal('read_only'), z.literal('read_write')]).default('read_write'),
  plugins: z.any().optional(),
}) satisfies z.ZodType<ColumnKey>

export type AssociationKey = {
  display_name: string
  slug: string
  model_name: string
  foreign_key: string
  primary_key: string
  visible: boolean
}
export const AssociationKeySchema = z.object({
  display_name: z.string(),
  slug: z.string(),
  model_name: z.string(),
  foreign_key: z.string(),
  primary_key: z.string(),
  visible: z.boolean(),
}) satisfies z.ZodType<AssociationKey>

export type ReferenceKey =
  | {
      display_name: string
      model_name: string
      reference_type: 'belongs_to'
      foreign_key: string
      primary_key: string
    }
  | {
      display_name: string
      model_name: string
      reference_type: 'has_one'
      foreign_key: string
      primary_key: string
      visible: boolean
    }

export const ReferenceKeySchema = z.union([
  z.object({
    display_name: z.string(),
    model_name: z.string(),
    reference_type: z.literal('belongs_to'),
    foreign_key: z.string(),
    primary_key: z.string(),
  }),
  z.object({
    display_name: z.string(),
    model_name: z.string(),
    reference_type: z.literal('has_one'),
    foreign_key: z.string(),
    primary_key: z.string(),
    visible: z.boolean(),
  }),
]) satisfies z.ZodType<ReferenceKey>

export type ResourceKey = {
  class_name: string
  display_column?: string
  display_name: string
  display_primary_key: string
  name: string
  primary_key: string | null
  searchable_columns?: string
  slug: string
  table_name: string
  visible: boolean
  plugins?: Partial<PluginType>

  // openapi3-ts
  properties?: Record<string, ColumnKey | AssociationKey | ReferenceKey>
  required?: string[]
}
export const ResourceKeySchema = z.object({
  name: z.string(),
  slug: z.string(),
  table_name: z.string(),
  class_name: z.string(),
  display_name: z.string(),
  primary_key: z.string().nullable(),
  visible: z.boolean(),
  display_primary_key: z.string(),
  display_column: z.string().optional(),
  searchable_columns: z.string().optional(),

  plugins: z.any().optional(),

  // openapi3-ts
  properties: z.record(z.string(), z.union([ColumnKeySchema, AssociationKeySchema, ReferenceKeySchema])).optional(),
  required: z.array(z.string()).optional(),
}) satisfies z.ZodType<ResourceKey>
