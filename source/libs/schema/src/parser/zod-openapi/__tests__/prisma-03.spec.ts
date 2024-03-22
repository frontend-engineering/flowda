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
        "display_primary_key": false,
        "key_type": "resource",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "display_name": "邮箱",
            "key_type": "column",
            "type": "string",
          },
          "id": {
            "display_name": "Id",
            "key_type": "column",
            "type": "integer",
          },
          "name": {
            "display_name": "用户名",
            "key_type": "column",
            "nullable": true,
            "type": "string",
          },
        },
        "required": [
          "id",
          "email",
        ],
        "searchable_columns": [
          "email",
          "name",
        ],
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })
})
