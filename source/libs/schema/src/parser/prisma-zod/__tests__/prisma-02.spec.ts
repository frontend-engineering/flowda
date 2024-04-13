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
    const extendedDMMFModel = new ExtendedDMMFModel(
      parseGeneratorConfig(generatorOptions),
      model!,
      dmmf.datamodel.models,
    )
    expect(writeModelOpenApi(extendedDMMFModel)).toMatchInlineSnapshot(`
      {
        "class_name": "Tenant",
        "display_name": "Tenants",
        "display_primary_key": "true",
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
    const tenantModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!, dmmf.datamodel.models)
    const nameField = tenantModel.fields.find(f => f.name === 'name')
    expect(writeFieldOpenApi(nameField!)).toMatchInlineSnapshot(`
      {
        "column_type": "String",
        "display_name": "Name",
        "visible": true,
      }
    `)
  })

  it('writeFieldOpenApi Tenant#users', async () => {
    const config = parseGeneratorConfig(generatorOptions)
    const model = dmmf.datamodel.models.find(m => m.name === 'Tenant')
    const tenantModel = new ExtendedDMMFModel(config, model!, dmmf.datamodel.models)

    const usersField = tenantModel.fields.find(f => f.name === 'users')
    expect(writeFieldOpenApi(usersField!)).toMatchInlineSnapshot(`
      {
        "display_name": "Users",
        "foreign_key": "tenantId",
        "model_name": "User",
        "primary_key": "id",
        "slug": "users",
        "visible": true,
      }
    `)
  })

  it('writeFieldOpenApi User#tenantId', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'User')
    const userModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!, dmmf.datamodel.models)
    const tenantIdField = userModel.fields.find(f => f.name === 'tenantId')
    expect(writeFieldOpenApi(tenantIdField!)).toMatchInlineSnapshot(`
      {
        "column_type": "Int",
        "display_name": "Tenant Id",
        "visible": true,
      }
    `)
  })

  it('writeFieldOpenApi User#tenant', async () => {
    const model = dmmf.datamodel.models.find(m => m.name === 'User')
    const userModel = new ExtendedDMMFModel(parseGeneratorConfig(generatorOptions), model!, dmmf.datamodel.models)
    const tenantField = userModel.fields.find(f => f.name === 'tenant')
    expect(writeFieldOpenApi(tenantField!)).toMatchInlineSnapshot(`
      {
        "display_name": "Tenant",
        "foreign_key": "tenantId",
        "model_name": "Tenant",
        "primary_key": "id",
        "reference_type": "belongs_to",
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
        id: z.number().int().column({ display_name: 'Id', column_type: 'Int', visible: true }),
        name: z.string().column({ display_name: 'Name', column_type: 'String', visible: true }),
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
          visible: false,
          foreign_key: 'tenantId',
          primary_key: 'id'
        }),
      }))

      /////////////////////////////////////////
      // USER SCHEMA
      /////////////////////////////////////////

      export const UserSchema = z.object({
        id: z.number().int().column({ display_name: 'Id', column_type: 'Int', visible: true }),
        email: z.string().column({ display_name: 'Email', column_type: 'String', visible: true }),
        name: z.string().nullish().column({ display_name: 'Name', column_type: 'String', visible: true }),
        tenantId: z.number().int().column({ display_name: 'Tenant Id', column_type: 'Int', visible: true }),
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
          reference_type: 'has_one',
          visible: true
        }),
      }))

      /////////////////////////////////////////
      // USER PROFILE SCHEMA
      /////////////////////////////////////////

      export const UserProfileSchema = z.object({
        id: z.number().int().column({ display_name: 'Id', column_type: 'Int', visible: true }),
        fullName: z.string().column({ display_name: 'Full Name', column_type: 'String', visible: true }),
        userId: z.number().int().column({ display_name: 'User Id', column_type: 'Int', visible: true }),
        tenantId: z.number().int().column({ display_name: 'Tenant Id', column_type: 'Int', visible: false }),
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
      "
    `)
  })
})
