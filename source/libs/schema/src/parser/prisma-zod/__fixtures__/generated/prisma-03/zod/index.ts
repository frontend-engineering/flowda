import { z } from 'zod';
import { Prisma } from '../@prisma/client-03';
import { extendZod } from '../../../../../zod-openapi/extend-zod';
extendZod(z);

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

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','email','name','extendedDescriptionData']);

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
  id: z.number().int().column({
    display_name: 'Id',
    column_type: 'Int',
    visible: true,
    access_type: 'read_write'
  }),
  createdAt: z.date().column({
    display_name: 'Created At',
    column_type: 'DateTime',
    access_type: 'read_only',
    visible: true
  }),
  updatedAt: z.date().column({
    display_name: 'Updated At',
    column_type: 'DateTime',
    visible: true,
    access_type: 'read_only'
  }),
  isDeleted: z.boolean().column({
    display_name: 'Is Deleted',
    column_type: 'Boolean',
    visible: false,
    access_type: 'read_only'
  }),
  email: z.string().column({
    display_name: '邮箱',
    column_type: 'String',
    visible: true,
    access_type: 'read_write'
  }),
  name: z.string().nullish().column({
    display_name: '用户名',
    column_type: 'String',
    visible: false,
    plugins: { legacy: { prisma: 'false' } },
    access_type: 'read_write'
  }),
  extendedDescriptionData: z.any().optional().nullish().column({
    display_name: 'Extended Description Data',
    column_type: 'Json',
    visible: true,
    access_type: 'read_write'
  }),
}).resource({
  name: 'User',
  slug: 'users',
  table_name: 'User',
  class_name: 'User',
  display_name: '员工',
  primary_key: 'id',
  visible: true,
  display_primary_key: 'false',
  display_column: 'email',
  searchable_columns: 'email,name',
  plugins: { legacy: { route_prefix: '/admin' } }
})

export type User = z.infer<typeof UserSchema>
