import { z } from 'zod';
import type { TenantWithRelations } from './TenantSchema'
import { TenantWithRelationsSchema } from './TenantSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({"name":"id","display_name":"Id","column_source":"table"}),
  email: z.string().openapi({"name":"email","display_name":"Email","column_source":"table"}),
  name: z.string().nullish().openapi({"name":"name","display_name":"Name","column_source":"table"}),
  tenantId: z.number().int().openapi({"name":"tenantId","display_name":"Tenant Id","column_source":"table"}),
}).openapi({"name":"User","slug":"users","table_name":"User","class_name":"User","display_name":"Users","primary_key":"id","visible":true,"display_primary_key":true})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  tenant: TenantWithRelations;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodObject<any> = UserSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema).openapi({"name":"tenant","display_name":"Tenant","model_name":"Tenant","foreign_key":"tenantId","primary_key":"id","reference_type":"belongs_to"}),
}))

export default UserSchema;
