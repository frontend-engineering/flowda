import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','tenantId']);

export default UserScalarFieldEnumSchema;
