import {
  TenantSchema,
  TenantWithRelationsSchema,
  UserWithRelationsSchema,
} from '../../prisma-zod/__fixtures__/prisma-02/index'
import { zodToOpenAPI } from '../index'

describe('prisma 02 generated zod to openapi', function () {
  it('parse a prisma generated zod schema, multi files', () => {
    const output = zodToOpenAPI(TenantSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "Tenant",
        "display_name": "Tenants",
        "display_primary_key": "true",
        "name": "Tenant",
        "primary_key": "id",
        "properties": {
          "id": {
            "access_type": "read_write",
            "column_type": "Int",
            "display_name": "Id",
            "type": "integer",
            "visible": true,
          },
          "name": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "Name",
            "type": "string",
            "visible": true,
          },
        },
        "required": [
          "id",
          "name",
        ],
        "slug": "tenants",
        "table_name": "Tenant",
        "type": "object",
        "visible": true,
      }
    `)
  })

  it('parse a prisma generated zod schema, multi files, relation, many', () => {
    const output = zodToOpenAPI(TenantWithRelationsSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "Tenant",
        "display_name": "Tenants",
        "display_primary_key": "true",
        "name": "Tenant",
        "primary_key": "id",
        "properties": {
          "id": {
            "access_type": "read_write",
            "column_type": "Int",
            "display_name": "Id",
            "type": "integer",
            "visible": true,
          },
          "name": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "Name",
            "type": "string",
            "visible": true,
          },
          "userProfiles": {
            "display_name": "User Profiles",
            "foreign_key": "tenantId",
            "items": {},
            "model_name": "UserProfile",
            "primary_key": "id",
            "slug": "user_profiles",
            "type": "array",
            "visible": false,
          },
          "users": {
            "display_name": "Users",
            "foreign_key": "tenantId",
            "items": {},
            "model_name": "User",
            "primary_key": "id",
            "slug": "users",
            "type": "array",
            "visible": true,
          },
        },
        "required": [
          "id",
          "name",
          "users",
          "userProfiles",
        ],
        "slug": "tenants",
        "table_name": "Tenant",
        "type": "object",
        "visible": true,
      }
    `)
  })

  it('parse a prisma generated zod schema, multi files, relation', () => {
    const output = zodToOpenAPI(UserWithRelationsSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_name": "Users",
        "display_primary_key": "true",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "Email",
            "type": "string",
            "visible": true,
          },
          "id": {
            "access_type": "read_write",
            "column_type": "Int",
            "display_name": "Id",
            "type": "integer",
            "visible": true,
          },
          "name": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "Name",
            "nullable": true,
            "type": "string",
            "visible": true,
          },
          "tenant": {
            "display_name": "Tenant",
            "foreign_key": "tenantId",
            "model_name": "Tenant",
            "primary_key": "id",
            "reference_type": "belongs_to",
          },
          "tenantId": {
            "access_type": "read_write",
            "column_type": "Int",
            "display_name": "Tenant Id",
            "type": "integer",
            "visible": true,
          },
          "userProfile": {
            "display_name": "User Profile",
            "foreign_key": "userId",
            "model_name": "UserProfile",
            "nullable": true,
            "primary_key": "id",
            "reference_type": "has_one",
            "visible": true,
          },
        },
        "required": [
          "id",
          "email",
          "tenantId",
          "tenant",
        ],
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })
})
