import { z } from 'zod'

export const TenantSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
})

export type TenantRelations = {
  users: UserWithRelations[]
}
export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

export const TenantWithRelationsSchema: z.ZodType<TenantWithRelations> = TenantSchema.extend({
  users: z.lazy(() => UserWithRelationsSchema).array(),
})

export type UserRelations = {
  tenant?: TenantWithRelations
}
export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.extend({
  tenant: z.lazy(() => TenantWithRelationsSchema).optional(),
})
