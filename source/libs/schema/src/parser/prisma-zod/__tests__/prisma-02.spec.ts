import * as path from 'path'
import {
  ExtendedDMMF,
  ExtendedDMMFModel,
  loadDMMF,
  parseGeneratorConfig,
  writeFieldOpenApi,
  writeModelOpenApi,
} from 'zod-prisma-types'
import { writeSingleFileModelStatements } from './utils/write-single-file-model-statements'
import { createGeneratorOptions } from './utils/generator-options'
import { DMMF, GeneratorOptions } from '@prisma/generator-helper'

describe('prisma-02', function () {
  let dmmf: DMMF.Document
  let generatorOptions: GeneratorOptions
  beforeAll(async () => {
    dmmf = await loadDMMF(path.join(__dirname, '../__fixtures__/prisma-02/prisma/schema.prisma'))
    generatorOptions = createGeneratorOptions({ dmmf })
  })

  it('writeModelOpenApi Tenant', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'Tenant')
    const extendedDMMFModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!)
    expect(writeModelOpenApi(extendedDMMFModel)).toMatchInlineSnapshot(`
      {
        "class_name": "Tenant",
        "display_name": "Tenants",
        "display_primary_key": true,
        "name": "Tenant",
        "primary_key": "id",
        "slug": "tenants",
        "table_name": "Tenant",
        "visible": true,
      }
    `)
  })

  it('writeFieldOpenApi Tenant#name', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'Tenant')
    const tenantModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!)
    const nameField = tenantModel.fields.find(f => f.name === 'name')
    expect(writeFieldOpenApi(nameField!)).toMatchInlineSnapshot(`
      {
        "column_source": "table",
        "display_name": "Name",
        "name": "name",
      }
    `)
  })

  it('writeFieldOpenApi Tenant#users', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'Tenant')
    const tenantModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!)
    const usersField = tenantModel.fields.find(f => f.name === 'users')
    expect(writeFieldOpenApi(usersField!)).toMatchInlineSnapshot(`
      {
        "associations": true,
        "display_name": "Users",
        "model_name": "User",
        "name": "users",
        "slug": "users",
        "visible": true,
      }
    `)
  })

  it('writeFieldOpenApi User#tenantId', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'User')
    const userModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!)
    const tenantIdField = userModel.fields.find(f => f.name === 'tenantId')
    expect(writeFieldOpenApi(tenantIdField!)).toMatchInlineSnapshot(`
      {
        "column_source": "table",
        "display_name": "Tenant Id",
        "name": "tenantId",
      }
    `)
  })

  it('writeFieldOpenApi User#tenant', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'User')
    const userModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!)
    const tenantField = userModel.fields.find(f => f.name === 'tenant')
    expect(writeFieldOpenApi(tenantField!)).toMatchInlineSnapshot(`
      {
        "display_name": "Tenant",
        "foreign_key": "tenantId",
        "model_name": "Tenant",
        "name": "tenant",
        "primary_key": "id",
        "reference_type": "belongs_to",
        "references": true,
      }
    `)
  })

  it('writeSingleFileModelStatements', async () => {
    const config = parseGeneratorConfig(generatorOptions)
    const extendedDMMF = new ExtendedDMMF(dmmf, config)
    const fileWriter = writeSingleFileModelStatements({ dmmf: extendedDMMF })
    expect(fileWriter.writer.toString()).toMatchInlineSnapshot(`
      "

      /////////////////////////////////////////
      // TENANT SCHEMA
      /////////////////////////////////////////

      export const TenantSchema = z.object({
        id: z.number().int().openapi({"name":"id","display_name":"Id","column_source":"table"}),
        name: z.string().openapi({"name":"name","display_name":"Name","column_source":"table"}),
      }).openapi({"name":"Tenant","slug":"tenants","table_name":"Tenant","class_name":"Tenant","display_name":"Tenants","primary_key":"id","visible":true,"display_primary_key":true})

      export type Tenant = z.infer<typeof TenantSchema>

      // TENANT RELATION SCHEMA
      //------------------------------------------------------

      export type TenantRelations = {
        users: UserWithRelations[];
      };

      export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

      export const TenantWithRelationsSchema: z.ZodObject<any> = TenantSchema.merge(z.object({
        users: z.lazy(() => UserWithRelationsSchema).array().openapi({"name":"users","display_name":"Users","slug":"users","model_name":"User","visible":true,"associations":true}),
      }))

      /////////////////////////////////////////
      // USER SCHEMA
      /////////////////////////////////////////

      export const UserSchema = z.object({
        id: z.number().int().openapi({"name":"id","display_name":"Id","column_source":"table"}),
        email: z.string().openapi({"name":"email","display_name":"Email","column_source":"table"}),
        name: z.string().nullish().openapi({"name":"name","display_name":"Name","column_source":"table"}),
        tenantId: z.number().int().openapi({"name":"tenantId","display_name":"Tenant Id","column_source":"table"}),
      }).openapi({"name":"User","slug":"users","table_name":"User","class_name":"User","display_name":"Users","primary_key":"id","visible":true,"display_primary_key":true})

      export type User = z.infer<typeof UserSchema>

      // USER RELATION SCHEMA
      //------------------------------------------------------

      export type UserRelations = {
        tenant: TenantWithRelations;
      };

      export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

      export const UserWithRelationsSchema: z.ZodObject<any> = UserSchema.merge(z.object({
        tenant: z.lazy(() => TenantWithRelationsSchema).openapi({"name":"tenant","display_name":"Tenant","model_name":"Tenant","foreign_key":"tenantId","primary_key":"id","reference_type":"belongs_to","references":true}),
      }))
      "
    `)
  })
})
