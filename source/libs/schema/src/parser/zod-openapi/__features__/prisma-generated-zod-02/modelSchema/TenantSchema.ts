import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import type { UserPartialWithRelations } from './UserSchema'
import type { UserOptionalDefaultsWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'
import { UserPartialWithRelationsSchema } from './UserSchema'
import { UserOptionalDefaultsWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  id: z.number().int().openapi({}),
  name: z.string().openapi({}),
}).openapi({})

export type Tenant = z.infer<typeof TenantSchema>

/////////////////////////////////////////
// TENANT PARTIAL SCHEMA
/////////////////////////////////////////

export const TenantPartialSchema = TenantSchema.partial()

export type TenantPartial = z.infer<typeof TenantPartialSchema>

/////////////////////////////////////////
// TENANT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TenantOptionalDefaultsSchema = TenantSchema.merge(z.object({
  id: z.number().int().optional().openapi({}),
}))

export type TenantOptionalDefaults = z.infer<typeof TenantOptionalDefaultsSchema>

/////////////////////////////////////////
// TENANT RELATION SCHEMA
/////////////////////////////////////////

export type TenantRelations = {
  users: UserWithRelations[];
};

export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

export const TenantWithRelationsSchema: z.ZodObject<any> = TenantSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array().openapi({}),
}))

/////////////////////////////////////////
// TENANT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TenantOptionalDefaultsRelations = {
  users: UserOptionalDefaultsWithRelations[];
};

export type TenantOptionalDefaultsWithRelations = z.infer<typeof TenantOptionalDefaultsSchema> & TenantOptionalDefaultsRelations

export const TenantOptionalDefaultsWithRelationsSchema: z.ZodType<TenantOptionalDefaultsWithRelations> = TenantOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).array().openapi({}),
}))

/////////////////////////////////////////
// TENANT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type TenantPartialRelations = {
  users?: UserPartialWithRelations[];
};

export type TenantPartialWithRelations = z.infer<typeof TenantPartialSchema> & TenantPartialRelations

export const TenantPartialWithRelationsSchema: z.ZodType<TenantPartialWithRelations> = TenantPartialSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array().openapi({}),
})).partial()

export type TenantOptionalDefaultsWithPartialRelations = z.infer<typeof TenantOptionalDefaultsSchema> & TenantPartialRelations

export const TenantOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TenantOptionalDefaultsWithPartialRelations> = TenantOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array().openapi({}),
}).partial())

export type TenantWithPartialRelations = z.infer<typeof TenantSchema> & TenantPartialRelations

export const TenantWithPartialRelationsSchema: z.ZodType<TenantWithPartialRelations> = TenantSchema.merge(z.object({
  users: z.lazy(() => UserPartialWithRelationsSchema).array().openapi({}),
}).partial())

export default TenantSchema;
