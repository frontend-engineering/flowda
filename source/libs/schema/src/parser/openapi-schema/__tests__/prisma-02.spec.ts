import { zodToOpenAPI } from '../../zod-openapi/index'
import { TenantWithRelationsSchema } from '../../prisma-zod/__fixtures__/prisma-02/index'
import { SchemaTransformer } from '../schema-transformer'

describe('prisma-02', function () {
  it('Tenant', () => {
    const jsonSchema = zodToOpenAPI(TenantWithRelationsSchema)
    const output = new SchemaTransformer().set(jsonSchema).toJSON()
    expect(output).toMatchInlineSnapshot(`
      {
        "properties": {
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
            "type": "string",
          },
          "users": {
            "associations": true,
            "display_name": "Users",
            "items": {},
            "model_name": "User",
            "name": "users",
            "slug": "users",
            "type": "array",
            "visible": true,
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
})
