import { generateSchema } from '../zod-openapi'
import { UserSchema } from '../../prisma-zod/__fixtures__/prisma-03/index'

describe('prisma 03 generated zod to openapi', function () {
  it('parse a prisma generated zod schema, rich comments', () => {
    const output = generateSchema(UserSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "display_column": "email",
        "display_name": "员工",
        "properties": {
          "email": {
            "title": "邮箱",
            "type": "string",
          },
          "id": {
            "type": "integer",
          },
          "name": {
            "nullable": true,
            "title": "用户名",
            "type": "string",
          },
        },
        "required": [
          "id",
          "email",
        ],
        "type": "object",
      }
    `)
  })
})
