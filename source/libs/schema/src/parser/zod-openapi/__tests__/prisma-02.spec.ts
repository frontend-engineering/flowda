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
        "display_primary_key": true,
        "key_type": "resource",
        "name": "Tenant",
        "primary_key": "id",
        "properties": {
          "id": {
            "display_name": "Id",
            "key_type": "column",
            "type": "integer",
          },
          "name": {
            "display_name": "Name",
            "key_type": "column",
            "type": "string",
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
        "display_primary_key": true,
        "key_type": "resource",
        "name": "Tenant",
        "primary_key": "id",
        "properties": {
          "id": {
            "display_name": "Id",
            "key_type": "column",
            "type": "integer",
          },
          "name": {
            "display_name": "Name",
            "key_type": "column",
            "type": "string",
          },
          "userProfiles": {
            "display_name": "User Profiles",
            "foreign_key": "tenantId",
            "items": {},
            "key_type": "association",
            "model_name": "UserProfile",
            "primary_key": "id",
            "slug": "user_profiles",
            "type": "array",
            "visible": true,
          },
          "users": {
            "display_name": "Users",
            "foreign_key": "tenantId",
            "items": {},
            "key_type": "association",
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
        "display_primary_key": true,
        "key_type": "resource",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "display_name": "Email",
            "key_type": "column",
            "type": "string",
          },
          "id": {
            "display_name": "Id",
            "key_type": "column",
            "type": "integer",
          },
          "name": {
            "display_name": "Name",
            "key_type": "column",
            "nullable": true,
            "type": "string",
          },
          "tenant": {
            "display_name": "Tenant",
            "foreign_key": "tenantId",
            "key_type": "reference",
            "model_name": "Tenant",
            "primary_key": "id",
            "reference_type": "belongs_to",
          },
          "tenantId": {
            "display_name": "Tenant Id",
            "key_type": "column",
            "type": "integer",
          },
          "userProfile": {
            "display_name": "User Profile",
            "foreign_key": "userId",
            "key_type": "reference",
            "model_name": "UserProfile",
            "nullable": true,
            "primary_key": "id",
            "reference_type": "has_one",
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
