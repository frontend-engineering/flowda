import { zodToOpenAPI } from '../zod-openapi'
import {
  TenantSchema,
  TenantWithRelationsSchema,
  UserWithRelationsSchema,
} from '../../prisma-zod/__fixtures__/prisma-02/index'

describe('prisma 02 generated zod to openapi', function () {
  it('parse a prisma generated zod schema, multi files', () => {
    const output = zodToOpenAPI(TenantSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "Tenant",
        "display_name": "Tenants",
        "display_primary_key": true,
        "name": "Tenant",
        "primary_key": "id",
        "properties": {
          "id": {
            "column_source": "table",
            "display_name": "Id",
            "name": "id",
            "type": "integer",
          },
          "name": {
            "column_source": "table",
            "display_name": "Name",
            "name": "name",
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
        "properties": {
          "id": {
            "column_source": "table",
            "display_name": "Id",
            "name": "id",
            "type": "integer",
          },
          "name": {
            "column_source": "table",
            "display_name": "Name",
            "name": "name",
            "type": "string",
          },
          "users": {
            "associations": true,
            "display_name": "Users",
            "items": {},
            "model_name": "User",
            "name": "users",
            "slug": "users",
            "type": "array",
            "visible": true,
          },
        },
        "required": [
          "id",
          "name",
          "users",
        ],
        "type": "object",
      }
    `)
  })

  it('parse a prisma generated zod schema, multi files, relation', () => {
    const output = zodToOpenAPI(UserWithRelationsSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "properties": {
          "email": {
            "column_source": "table",
            "display_name": "Email",
            "name": "email",
            "type": "string",
          },
          "id": {
            "column_source": "table",
            "display_name": "Id",
            "name": "id",
            "type": "integer",
          },
          "name": {
            "column_source": "table",
            "display_name": "Name",
            "name": "name",
            "nullable": true,
            "type": "string",
          },
          "tenant": {
            "display_name": "Tenant",
            "foreign_key": "tenantId",
            "model_name": "Tenant",
            "name": "tenant",
            "primary_key": "id",
            "reference_type": "belongs_to",
            "references": true,
          },
          "tenantId": {
            "column_source": "table",
            "display_name": "Tenant Id",
            "name": "tenantId",
            "type": "integer",
          },
        },
        "required": [
          "id",
          "email",
          "tenantId",
          "tenant",
        ],
        "type": "object",
      }
    `)
  })
})
