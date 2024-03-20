import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({"name":"id","display_name":"Id","column_source":"table"}),
  email: z.string().openapi({"name":"email","display_name":"Email","column_source":"table"}),
  name: z.string().nullish().openapi({"name":"name","display_name":"Name","column_source":"table"}),
}).openapi({"name":"User","slug":"users","table_name":"User","class_name":"User","display_name":"Users","primary_key":"id","visible":true,"display_primary_key":true})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
