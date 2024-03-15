import { z } from 'zod';
import type { TenantWithRelations } from './TenantSchema'
import type { TenantPartialWithRelations } from './TenantSchema'
import type { TenantOptionalDefaultsWithRelations } from './TenantSchema'
import { TenantWithRelationsSchema } from './TenantSchema'
import { TenantPartialWithRelationsSchema } from './TenantSchema'
import { TenantOptionalDefaultsWithRelationsSchema } from './TenantSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({}),
  email: z.string().openapi({}),
  name: z.string().nullable().openapi({}),
  tenantId: z.number().int().openapi({}),
}).openapi({})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.number().int().optional().openapi({}),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  tenant: TenantWithRelations;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodObject<any> = UserSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema).openapi({}),
}))

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UserOptionalDefaultsRelations = {
  tenant: TenantOptionalDefaultsWithRelations;
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  tenant: z.lazy(() => TenantOptionalDefaultsWithRelationsSchema).openapi({}),
}))

/////////////////////////////////////////
// USER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserPartialRelations = {
  tenant?: TenantPartialWithRelations;
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  tenant: z.lazy(() => TenantPartialWithRelationsSchema).openapi({}),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  tenant: z.lazy(() => TenantPartialWithRelationsSchema).openapi({}),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  tenant: z.lazy(() => TenantPartialWithRelationsSchema).openapi({}),
}).partial())

export default UserSchema;
