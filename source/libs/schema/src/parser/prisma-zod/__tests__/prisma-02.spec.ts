import * as path from 'path'
import { ExtendedDMMF, loadDMMF, parseGeneratorConfig } from 'zod-prisma-types'
import { writeSingleFileModelStatements } from './utils/write-single-file-model-statements'
import { createGeneratorOptions } from './utils/generator-options'

describe('prisma-02', function () {
  it('test', async () => {
    const dmmf = await loadDMMF(path.join(__dirname, '../__fixtures__/prisma-02/prisma/schema.prisma'))

    const config = parseGeneratorConfig(createGeneratorOptions({ dmmf }))
    const extendedDMMF = new ExtendedDMMF(dmmf, config)
    const fileWriter = writeSingleFileModelStatements({ dmmf: extendedDMMF })
    expect(fileWriter.writer.toString()).toMatchInlineSnapshot(`
      "

      /////////////////////////////////////////
      // TENANT SCHEMA
      /////////////////////////////////////////

      export const TenantSchema = z.object({
        id: z.number().int().openapi({}),
        name: z.string().openapi({}),
      }).openapi({})

      export type Tenant = z.infer<typeof TenantSchema>

      // TENANT RELATION SCHEMA
      //------------------------------------------------------

      export type TenantRelations = {
        users: UserWithRelations[];
      };

      export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

      export const TenantWithRelationsSchema: z.ZodObject<any> = TenantSchema.merge(z.object({
        users: z.lazy(() => UserWithRelationsSchema).array().openapi({}),
      }))

      /////////////////////////////////////////
      // USER SCHEMA
      /////////////////////////////////////////

      export const UserSchema = z.object({
        id: z.number().int().openapi({}),
        email: z.string().openapi({}),
        name: z.string().nullish().openapi({}),
        tenantId: z.number().int().openapi({}),
      }).openapi({})

      export type User = z.infer<typeof UserSchema>

      // USER RELATION SCHEMA
      //------------------------------------------------------

      export type UserRelations = {
        tenant: TenantWithRelations;
      };

      export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

      export const UserWithRelationsSchema: z.ZodObject<any> = UserSchema.merge(z.object({
        tenant: z.lazy(() => TenantWithRelationsSchema).openapi({}),
      }))
      "
    `)
  })
})
