import { z } from 'zod';
import type { TenantWithRelations } from './TenantSchema'
import { TenantWithRelationsSchema } from './TenantSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({}),
  email: z.string().openapi({}),
  name: z.string().nullish().openapi({}),
  tenantId: z.number().int().openapi({}),
}).openapi({})

export type User = z.infer<typeof UserSchema>

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

export default UserSchema;
