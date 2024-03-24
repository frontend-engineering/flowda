import { z } from 'zod';
import type { Prisma } from '../@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().openapi({ key_type: 'column', display_name: 'Id' }),
  email: z.string().openapi({ key_type: 'column', display_name: '邮箱' }),
  name: z.string().nullish().openapi({ key_type: 'column', display_name: '用户名' }),
}).openapi({
  key_type: 'resource',
  name: 'User',
  slug: 'users',
  table_name: 'User',
  class_name: 'User',
  display_name: '员工',
  primary_key: 'id',
  visible: true,
  display_primary_key: 'false',
  display_column: 'email',
  searchable_columns: 'email,name'
}).openapi({ legacy: { route_prefix: '/admin' } })

export type User = z.infer<typeof UserSchema>
