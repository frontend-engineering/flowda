import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({}),
  email: z.string().openapi({}),
  name: z.string().nullish().openapi({}),
}).openapi({})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
