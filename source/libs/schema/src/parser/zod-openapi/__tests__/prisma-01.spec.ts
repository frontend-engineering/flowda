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
        "name": "User",
        "primary_key": "id",
        "properties": {
          "email": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "Email",
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
          "name": {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "Name",
            "nullable": true,
            "type": "string",
            "visible": true,
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
