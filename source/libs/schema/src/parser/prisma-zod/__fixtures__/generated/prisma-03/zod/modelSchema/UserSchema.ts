import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({"key_type":"column","name":"id","display_name":"Id","column_source":"table"}),
  email: z.string().openapi({"key_type":"column","name":"email","display_name":"邮箱","column_source":"table"}),
  name: z.string().nullish().openapi({"key_type":"column","name":"name","display_name":"用户名","column_source":"table"}),
}).openapi({"key_type":"resource","name":"User","slug":"users","table_name":"User","class_name":"User","display_name":"员工","primary_key":"id","visible":true,"display_primary_key":false,"display_column":"email","searchable_columns":["email","name"]})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
