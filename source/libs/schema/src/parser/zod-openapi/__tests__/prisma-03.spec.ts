import { zodToOpenAPI } from '../zod-openapi'
import { UserSchema } from '../../prisma-zod/__fixtures__/prisma-03/index'

describe('prisma 03 generated zod to openapi', function () {
  it('parse a prisma generated zod schema, rich comments', () => {
    const output = zodToOpenAPI(UserSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_column": "email",
        "display_name": "员工",
        "display_primary_key": true,
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "column_source": "table",
            "display_name": "Email",
            "name": "email",
            "title": "邮箱",
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
            "title": "用户名",
            "type": "string",
          },
        },
        "required": [
          "id",
          "email",
        ],
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })
})
