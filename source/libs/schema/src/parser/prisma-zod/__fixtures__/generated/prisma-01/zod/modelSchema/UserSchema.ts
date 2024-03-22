import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({"key_type":"column","display_name":"Id"}),
  email: z.string().openapi({"key_type":"column","display_name":"Email"}),
  name: z.string().nullish().openapi({"key_type":"column","display_name":"Name"}),
}).openapi({"key_type":"resource","name":"User","slug":"users","table_name":"User","class_name":"User","display_name":"Users","primary_key":"id","visible":true,"display_primary_key":true})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
