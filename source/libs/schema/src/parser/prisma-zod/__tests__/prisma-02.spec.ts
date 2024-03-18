import * as path from 'path'
import { ExtendedDMMF, ExtendedDMMFModel, loadDMMF, parseGeneratorConfig, writeOpenApi } from 'zod-prisma-types'
import { writeSingleFileModelStatements } from './utils/write-single-file-model-statements'
import { createGeneratorOptions } from './utils/generator-options'
import { DMMF } from '@prisma/generator-helper'
import { GeneratorOptions } from '@prisma/generator-helper/dist/types'

describe('prisma-02', function () {
  let dmmf: DMMF.Document
  let generatorOptions: GeneratorOptions
  beforeAll(async () => {
    dmmf = await loadDMMF(path.join(__dirname, '../__fixtures__/prisma-02/prisma/schema.prisma'))
    generatorOptions = createGeneratorOptions({ dmmf })
  })

  it('writeOpenApi', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'Tenant')
    const extendedDMMFModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!)
    expect(writeOpenApi(extendedDMMFModel)).toMatchInlineSnapshot(`"{"primary_key":"id"}"`)
  })

  it('test', async () => {
    const config = parseGeneratorConfig(generatorOptions)
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
      }).openapi({"primary_key":"id"})

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
      }).openapi({"primary_key":"id"})

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
