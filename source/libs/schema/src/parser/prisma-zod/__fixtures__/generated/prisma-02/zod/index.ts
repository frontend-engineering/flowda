import { z } from 'zod';
import type { Prisma } from '../@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TenantScalarFieldEnumSchema = z.enum(['id','name']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','tenantId']);

export const UserProfileScalarFieldEnumSchema = z.enum(['id','fullName','userId','tenantId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  id: z.number().int().column({ display_name: 'Id', column_type: 'Int' }),
  name: z.string().column({ display_name: 'Name', column_type: 'String' }),
}).resource({
  name: 'Tenant',
  slug: 'tenants',
  table_name: 'Tenant',
  class_name: 'Tenant',
  display_name: 'Tenants',
  primary_key: 'id',
  visible: true,
  display_primary_key: 'true'
})

export type Tenant = z.infer<typeof TenantSchema>

// TENANT RELATION SCHEMA
//------------------------------------------------------

export type TenantRelations = {
  users: UserWithRelations[];
  userProfiles: UserProfileWithRelations[];
};

export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

export const TenantWithRelationsSchema: z.ZodObject<any> = TenantSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array().association({
    display_name: 'Users',
    slug: 'users',
    model_name: 'User',
    visible: true,
    foreign_key: 'tenantId',
    primary_key: 'id'
  }),
  userProfiles: z.lazy(() => UserProfileWithRelationsSchema).array().association({
    display_name: 'User Profiles',
    slug: 'user_profiles',
    model_name: 'UserProfile',
    visible: true,
    foreign_key: 'tenantId',
    primary_key: 'id'
  }),
}))

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int().column({ display_name: 'Id', column_type: 'Int' }),
  email: z.string().column({ display_name: 'Email', column_type: 'String' }),
  name: z.string().nullish().column({ display_name: 'Name', column_type: 'String' }),
  tenantId: z.number().int().column({ display_name: 'Tenant Id', column_type: 'Int' }),
}).resource({
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

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  tenant: TenantWithRelations;
  userProfile?: UserProfileWithRelations | null;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodObject<any> = UserSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema).reference({
    display_name: 'Tenant',
    model_name: 'Tenant',
    foreign_key: 'tenantId',
    primary_key: 'id',
    reference_type: 'belongs_to'
  }),
  userProfile: z.lazy(() => UserProfileWithRelationsSchema).nullish().reference({
    display_name: 'User Profile',
    model_name: 'UserProfile',
    foreign_key: 'userId',
    primary_key: 'id',
    reference_type: 'has_one'
  }),
}))

/////////////////////////////////////////
// USER PROFILE SCHEMA
/////////////////////////////////////////

export const UserProfileSchema = z.object({
  id: z.number().int().column({ display_name: 'Id', column_type: 'Int' }),
  fullName: z.string().column({ display_name: 'Full Name', column_type: 'String' }),
  userId: z.number().int().column({ display_name: 'User Id', column_type: 'Int' }),
  tenantId: z.number().int().column({ display_name: 'Tenant Id', column_type: 'Int' }),
}).resource({
  name: 'UserProfile',
  slug: 'user_profiles',
  table_name: 'UserProfile',
  class_name: 'UserProfile',
  display_name: 'User Profiles',
  primary_key: 'id',
  visible: true,
  display_primary_key: 'true'
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// USER PROFILE RELATION SCHEMA
//------------------------------------------------------

export type UserProfileRelations = {
  user: UserWithRelations;
  tenant: TenantWithRelations;
};

export type UserProfileWithRelations = z.infer<typeof UserProfileSchema> & UserProfileRelations

export const UserProfileWithRelationsSchema: z.ZodObject<any> = UserProfileSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema).reference({
    display_name: 'User',
    model_name: 'User',
    foreign_key: 'userId',
    primary_key: 'id',
    reference_type: 'belongs_to'
  }),
  tenant: z.lazy(() => TenantWithRelationsSchema).reference({
    display_name: 'Tenant',
    model_name: 'Tenant',
    foreign_key: 'tenantId',
    primary_key: 'id',
    reference_type: 'belongs_to'
  }),
}))
