import { generateSchema as zodToOpenAPI } from '@anatine/zod-openapi'
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
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "column_source": "table",
            "display_name": "邮箱",
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
            "display_name": "用户名",
            "name": "name",
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
