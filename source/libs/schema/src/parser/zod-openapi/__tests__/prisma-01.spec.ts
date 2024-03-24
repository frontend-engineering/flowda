import { UserSchema } from '../../prisma-zod/__fixtures__/prisma-01/index'
import { zodToOpenAPI } from '../index'

describe('prisma 01 generated zod to openapi', function () {
  it('parse a prisma generated zod schema', () => {
    const output = zodToOpenAPI(UserSchema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_name": "Users",
        "display_primary_key": "true",
        "key_type": "resource",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "display_name": "Email",
            "key_type": "column",
            "type": "string",
          },
          "extendedDescriptionData": {
            "nullable": true,
          },
          "id": {
            "display_name": "Id",
            "key_type": "column",
            "type": "integer",
          },
          "name": {
            "display_name": "Name",
            "key_type": "column",
            "nullable": true,
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
