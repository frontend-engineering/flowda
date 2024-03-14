import { extendZodWithOpenApi } from './extend-zod';
import { z } from 'zod';
import { generateSchema } from './generate-schema';
import {
  OrderSchema,
  UserSchema,
} from './__features__/prisma-generated-zod-01/generated-zod-def';

extendZodWithOpenApi(z);

describe('schema', () => {
  it('zod openapi', () => {
    const schema = z
      .string()
      .openapi({ description: 'hello world!', example: 'hello world' });
    const output = generateSchema(schema);
    expect(output).toMatchInlineSnapshot(`
      {
        "effects": undefined,
        "schema": {
          "description": "hello world!",
          "example": "hello world",
          "type": "string",
        },
        "type": "schema",
      }
    `);
  });

  it('prisma generated zod schema', () => {
    const output = generateSchema(UserSchema);
    expect(output.schema).toMatchInlineSnapshot(`
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
    `);
  });
});
