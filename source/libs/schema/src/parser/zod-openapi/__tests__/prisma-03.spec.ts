import { zodToOpenAPI } from '../index'
import { UserSchema } from '../../prisma-zod/__fixtures__/prisma-03/index'

describe('prisma 03 generated zod to openapi', function () {
  it('parse a prisma generated zod schema, rich comments', () => {
    const output = zodToOpenAPI(UserSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_column": "email",
        "display_name": "员工",
        "display_primary_key": "false",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "createdAt": {
            "access_type": "read_only",
            "column_type": "DateTime",
            "display_name": "Created At",
            "format": "date-time",
            "type": "string",
            "visible": true,
          },
          "email": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "邮箱",
            "type": "string",
            "visible": true,
          },
          "extendedDescriptionData": {
            "access_type": "read_write",
            "column_type": "Json",
            "display_name": "Extended Description Data",
            "nullable": true,
            "visible": true,
          },
          "id": {
            "access_type": "read_write",
            "column_type": "Int",
            "display_name": "Id",
            "type": "integer",
            "visible": true,
          },
          "isDeleted": {
            "access_type": "read_only",
            "column_type": "Boolean",
            "display_name": "Is Deleted",
            "type": "boolean",
            "visible": false,
          },
          "name": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "用户名",
            "nullable": true,
            "type": "string",
            "visible": false,
            "x-legacy": {
              "prisma": "false",
            },
          },
          "updatedAt": {
            "access_type": "read_only",
            "column_type": "DateTime",
            "display_name": "Updated At",
            "format": "date-time",
            "type": "string",
            "visible": true,
          },
        },
        "required": [
          "id",
          "createdAt",
          "updatedAt",
          "isDeleted",
          "email",
        ],
        "searchable_columns": "email,name",
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
        "x-legacy": {
          "route_prefix": "/admin",
        },
      }
    `)
  })
})
