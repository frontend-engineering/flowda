import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({"name":"id","display_name":"Id","column_source":"table"}),
  email: z.string().openapi({"name":"email","display_name":"Email","column_source":"table","title":"邮箱"}),
  name: z.string().nullish().openapi({"name":"name","display_name":"Name","column_source":"table","title":"用户名"}),
}).openapi({"name":"User","slug":"users","table_name":"User","class_name":"User","display_name":"员工","primary_key":"id","visible":true,"display_primary_key":true,"display_column":"email"})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
