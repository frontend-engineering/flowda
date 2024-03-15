import { extendZodWithOpenApi } from './extend-zod'
import { z } from 'zod'
import { generateSchema } from './zod-openapi'
import { ProductSchema, UserSchema } from './__features__/prisma-generated-zod-01/generated-zod-def'
import {
  TenantSchema,
  TenantWithRelationsSchema,
  UserWithRelationsSchema,
} from '../prisma-zod/__fixtures__/prisma-02/prisma/generated/zod/index'

extendZodWithOpenApi(z)

describe('zod openapi', () => {
  it('parse a simple zod schema', () => {
    const schema = z.string().openapi({ description: 'hello world!', example: 'hello world' })
    const output = generateSchema(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "hello world!",
        "example": "hello world",
        "type": "string",
      }
    `)
  })

  it('parse a simple prisma generated zod schema', () => {
    const output = generateSchema(UserSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "display_column": "username",
        "display_name": "员工",
        "properties": {
          "anonymousCustomerToken": {
            "nullable": true,
            "title": "快捷创建",
            "type": "string",
          },
          "createdAt": {
            "format": "date-time",
            "type": "string",
          },
          "email": {
            "nullable": true,
            "title": "邮箱",
            "type": "string",
          },
          "hashedPassword": {
            "nullable": true,
            "type": "string",
          },
          "hashedRefreshToken": {
            "nullable": true,
            "type": "string",
          },
          "id": {
            "type": "integer",
          },
          "image": {
            "nullable": true,
            "title": "头像",
            "type": "string",
          },
          "isDeleted": {
            "type": "boolean",
          },
          "mobile": {
            "nullable": true,
            "title": "手机号",
            "type": "string",
          },
          "recoveryCode": {
            "nullable": true,
            "type": "string",
          },
          "recoveryToken": {
            "nullable": true,
            "type": "string",
          },
          "tenantId": {
            "reference": "Tenant",
            "type": "integer",
          },
          "updatedAt": {
            "format": "date-time",
            "type": "string",
          },
          "username": {
            "type": "string",
          },
          "weixinProfileId": {
            "nullable": true,
            "reference": "WeixinProfile",
            "type": "integer",
          },
        },
        "required": [
          "id",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "username",
          "hashedPassword",
          "hashedRefreshToken",
          "recoveryCode",
          "recoveryToken",
          "email",
          "mobile",
          "anonymousCustomerToken",
          "image",
          "tenantId",
          "weixinProfileId",
        ],
        "type": "object",
      }
    `)
  })

  it('parse a complex prisma generated zod schema', () => {
    const output = generateSchema(ProductSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "display_column": "name",
        "display_name": "产品",
        "primary_key": "id",
        "properties": {
          "amount": {
            "title": "额度",
            "type": "integer",
          },
          "createdAt": {
            "format": "date-time",
            "type": "string",
          },
          "extendedDescriptionData": {
            "nullable": true,
            "oneOf": [
              {
                "oneOf": [
                  {
                    "type": "string",
                  },
                  {
                    "type": "number",
                  },
                  {
                    "type": "boolean",
                  },
                  {},
                  {},
                ],
              },
              {
                "enum": [
                  "DbNull",
                ],
                "type": "string",
              },
              {
                "enum": [
                  "JsonNull",
                ],
                "type": "string",
              },
            ],
          },
          "fileSize": {
            "nullable": true,
            "type": "string",
          },
          "hasAds": {
            "nullable": true,
            "title": "广告",
            "type": "string",
          },
          "id": {
            "type": "integer",
          },
          "isDeleted": {
            "type": "boolean",
          },
          "name": {
            "title": "产品名",
            "type": "string",
          },
          "plan": {
            "nullable": true,
            "type": "integer",
          },
          "price": {
            "oneOf": [
              {
                "type": "number",
              },
              {
                "type": "string",
              },
              {
                "properties": {
                  "d": {
                    "items": {
                      "type": "number",
                    },
                    "type": "array",
                  },
                  "e": {
                    "type": "number",
                  },
                  "s": {
                    "type": "number",
                  },
                  "toFixed": {},
                },
                "required": [
                  "d",
                  "e",
                  "s",
                  "toFixed",
                ],
                "type": "object",
              },
            ],
            "override_type": "integer",
            "title": "价格",
          },
          "productType": {
            "enum": [
              "AMOUNT",
              "PLAN",
            ],
            "type": "string",
          },
          "restricted": {
            "type": "integer",
          },
          "storeDuration": {
            "nullable": true,
            "type": "integer",
          },
          "tecSupport": {
            "nullable": true,
            "title": "技术支持",
            "type": "string",
          },
          "tenantId": {
            "reference": "Tenant",
            "type": "integer",
          },
          "uid": {
            "format": "cuid",
            "type": "string",
          },
          "updatedAt": {
            "format": "date-time",
            "type": "string",
          },
          "validityPeriod": {
            "nullable": true,
            "title": "有效期/天",
            "type": "integer",
          },
        },
        "required": [
          "productType",
          "id",
          "uid",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "tenantId",
          "name",
          "price",
          "plan",
          "amount",
          "fileSize",
          "storeDuration",
          "hasAds",
          "tecSupport",
          "validityPeriod",
          "restricted",
        ],
        "searchable_columns": "id,name",
        "type": "object",
      }
    `)
  })

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
