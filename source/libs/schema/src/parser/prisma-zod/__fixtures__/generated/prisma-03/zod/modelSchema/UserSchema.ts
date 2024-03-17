import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({}),
  email: z.string().openapi({"title":"邮箱"}),
  name: z.string().nullish().openapi({"title":"用户名"}),
}).openapi({"display_name":"员工","display_column":"email"})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
