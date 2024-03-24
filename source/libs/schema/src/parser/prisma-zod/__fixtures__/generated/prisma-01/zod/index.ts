import { z } from 'zod';
import { Prisma } from '../@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','extendedDescriptionData']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({ key_type: 'column', display_name: 'Id' }),
  email: z.string().openapi({ key_type: 'column', display_name: 'Email' }),
  name: z.string().nullish().openapi({ key_type: 'column', display_name: 'Name' }),
  extendedDescriptionData: z.any().optional().nullish().openapi({ key_type: 'column', display_name: 'Extended Description Data' }),
}).openapi({
  key_type: 'resource',
  name: 'User',
  slug: 'users',
  table_name: 'User',
  class_name: 'User',
  display_name: 'Users',
  primary_key: 'id',
  visible: true,
  display_primary_key: 'true'
})

export type User = z.infer<typeof UserSchema>
