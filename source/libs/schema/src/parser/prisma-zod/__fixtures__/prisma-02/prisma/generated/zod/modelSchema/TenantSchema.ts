import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  id: z.number().int().openapi({}),
  name: z.string().openapi({}),
}).openapi({})

export type Tenant = z.infer<typeof TenantSchema>

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

export default TenantSchema;
