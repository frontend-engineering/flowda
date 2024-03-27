import { zodToOpenAPI } from '../index'
import { UserSchema } from '../../prisma-zod/__fixtures__/prisma-03/index'
import '../../prisma-zod/__tests__/utils/schema-legacy'

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
          "email": {
            "column_type": "String",
            "display_name": "邮箱",
            "type": "string",
          },
          "extendedDescriptionData": {
            "column_type": "Json",
            "display_name": "Extended Description Data",
            "nullable": true,
          },
          "id": {
            "column_type": "Int",
            "display_name": "Id",
            "type": "integer",
          },
          "name": {
            "column_type": "String",
            "display_name": "用户名",
            "nullable": true,
            "type": "string",
            "x-legacy": {
              "prisma": "false",
            },
          },
        },
        "required": [
          "id",
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
