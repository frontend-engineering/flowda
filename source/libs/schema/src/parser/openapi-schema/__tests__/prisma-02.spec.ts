import { zodToOpenAPI } from '@anatine/zod-openapi'
import { TenantWithRelationsSchema, UserWithRelationsSchema } from '../../prisma-zod/__fixtures__/prisma-02/index'
import { SchemaTransformer } from '../schema-transformer'

describe('prisma-02', function () {
  it('Tenant', () => {
    const jsonschema = zodToOpenAPI(TenantWithRelationsSchema)
    const output = new SchemaTransformer().set(jsonschema).toJSON()
    expect(output).toMatchInlineSnapshot(`
      {
        "associations": [
          {
            "display_name": "Users",
            "foreign_key": "tenantId",
            "model_name": "User",
            "name": "users",
            "primary_key": "id",
            "slug": "users",
            "visible": true,
          },
          {
            "display_name": "User Profiles",
            "foreign_key": "tenantId",
            "model_name": "UserProfile",
            "name": "userProfiles",
            "primary_key": "id",
            "slug": "user_profiles",
            "visible": true,
          },
        ],
        "class_name": "Tenant",
        "columns": [
          {
            "column_source": "table",
            "column_type": "integer",
            "display_name": "Id",
            "name": "id",
            "reference": undefined,
            "validators": [
              {
                "required": true,
              },
            ],
          },
          {
            "column_source": "table",
            "column_type": "string",
            "display_name": "Name",
            "name": "name",
            "reference": undefined,
            "validators": [
              {
                "required": true,
              },
            ],
          },
        ],
        "display_name": "Tenants",
        "display_primary_key": true,
        "name": "Tenant",
        "primary_key": "id",
        "slug": "tenants",
        "table_name": "Tenant",
        "type": "object",
        "visible": true,
      }
    `)
  })

  it('User', () => {
    const jsonschema = zodToOpenAPI(UserWithRelationsSchema)
    const output = new SchemaTransformer().set(jsonschema).toJSON()
    expect(output).toMatchInlineSnapshot(`
      {
        "associations": [],
        "class_name": "User",
        "columns": [
          {
            "column_source": "table",
            "column_type": "integer",
            "display_name": "Id",
            "name": "id",
            "reference": undefined,
            "validators": [
              {
                "required": true,
              },
            ],
          },
          {
            "column_source": "table",
            "column_type": "string",
            "display_name": "Email",
            "name": "email",
            "reference": undefined,
            "validators": [
              {
                "required": true,
              },
            ],
          },
          {
            "column_source": "table",
            "column_type": "string",
            "display_name": "Name",
            "name": "name",
            "reference": undefined,
            "validators": [],
          },
          {
            "column_source": "table",
            "column_type": "integer",
            "display_name": "Tenant Id",
            "name": "tenantId",
            "reference": {
              "display_name": "Tenant",
              "foreign_key": "tenantId",
              "model_name": "Tenant",
              "name": "tenant",
              "primary_key": "id",
              "reference_type": "belongs_to",
            },
            "validators": [
              {
                "required": true,
              },
            ],
          },
        ],
        "display_name": "Users",
        "display_primary_key": true,
        "name": "User",
        "primary_key": "id",
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })
})
