import { generateSchema } from '../zod-openapi'
import {
  TenantSchema,
  TenantWithRelationsSchema,
  UserWithRelationsSchema,
} from '../../prisma-zod/__fixtures__/prisma-02/index'

describe('prisma 02 generated zod to openapi', function () {
  it('parse a prisma generated zod schema, multi files', () => {
    const output = generateSchema(TenantSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "properties": {
          "id": {
            "type": "integer",
          },
          "name": {
            "type": "string",
          },
        },
        "required": [
          "id",
          "name",
        ],
        "type": "object",
      }
    `)
  })

  it('parse a prisma generated zod schema, multi files, relation, many', () => {
    const output = generateSchema(TenantWithRelationsSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "properties": {
          "id": {
            "type": "integer",
          },
          "name": {
            "type": "string",
          },
          "users": {
            "items": {},
            "type": "array",
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
    const output = generateSchema(UserWithRelationsSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "properties": {
          "email": {
            "type": "string",
          },
          "id": {
            "type": "integer",
          },
          "name": {
            "nullable": true,
            "type": "string",
          },
          "tenant": {},
          "tenantId": {
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
