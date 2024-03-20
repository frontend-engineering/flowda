import { z } from 'zod';
import type { UserWithRelations } from './UserSchema'
import { UserWithRelationsSchema } from './UserSchema'

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  id: z.number().int().openapi({"name":"id","display_name":"Id","column_source":"table"}),
  name: z.string().openapi({"name":"name","display_name":"Name","column_source":"table"}),
}).openapi({"name":"Tenant","slug":"tenants","table_name":"Tenant","class_name":"Tenant","display_name":"Tenants","primary_key":"id","visible":true,"display_primary_key":true})

export type Tenant = z.infer<typeof TenantSchema>

/////////////////////////////////////////
// TENANT RELATION SCHEMA
/////////////////////////////////////////

export type TenantRelations = {
  users: UserWithRelations[];
};

export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

export const TenantWithRelationsSchema: z.ZodObject<any> = TenantSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array().openapi({"name":"users","display_name":"Users","slug":"users","model_name":"User","visible":true,"foreign_key":"tenantId","primary_key":"id"}),
}))

export default TenantSchema;
