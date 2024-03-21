import { z } from 'zod';

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string().openapi({"key_type":"column","name":"identifier","display_name":"Identifier","column_source":"table"}),
  token: z.string().openapi({"key_type":"column","name":"token","display_name":"Token","column_source":"table"}),
  expires: z.date().openapi({"key_type":"column","name":"expires","display_name":"Expires","column_source":"table"}),
}).openapi({"key_type":"resource","name":"VerificationToken","slug":"verification_tokens","table_name":"VerificationToken","class_name":"VerificationToken","display_name":"Verification Tokens","primary_key":null,"visible":true,"display_primary_key":true})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

export default VerificationTokenSchema;
