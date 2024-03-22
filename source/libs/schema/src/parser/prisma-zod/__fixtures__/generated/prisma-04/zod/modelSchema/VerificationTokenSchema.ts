import { z } from 'zod';

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string().openapi({"key_type":"column","display_name":"Identifier"}),
  token: z.string().openapi({"key_type":"column","display_name":"Token"}),
  expires: z.date().openapi({"key_type":"column","display_name":"Expires"}),
}).openapi({"key_type":"resource","name":"VerificationToken","slug":"verification_tokens","table_name":"VerificationToken","class_name":"VerificationToken","display_name":"Verification Tokens","primary_key":null,"visible":true,"display_primary_key":true})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

export default VerificationTokenSchema;
