import { z } from 'zod'
import { extendZod, zodToOpenAPI } from './index'

extendZod(z)
describe('zod openapi', () => {
  it('parse a simple zod schema', () => {
    const schema = z.string().column({
      column_type: 'String',
      display_name: 'Hello',
      description: 'hello world!',
      example: 'hello world',
    })
    const output = zodToOpenAPI(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "column_type": "String",
        "description": "hello world!",
        "display_name": "Hello",
        "example": "hello world",
        "type": "string",
      }
    `)
  })

  it('parse a openapi then extend', () => {
    const schema = z
      .object({
        message: z.string(),
      })
      .resource({
        name: 'User',
        slug: 'users',
        table_name: 'User',
        class_name: 'User',
        display_name: '员工',
        primary_key: 'id',
        visible: true,
        display_primary_key: 'false',
      })
    const schema2 = schema
      .extend({
        from: z.string(),
      })
      .resource({
        plugins: {
          legacy: {
            prsima: false,
          },
        },
      })
    const output = zodToOpenAPI(schema2)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_name": "员工",
        "display_primary_key": "false",
        "name": "User",
        "plugins": {
          "legacy": {
            "prsima": false,
          },
        },
        "primary_key": "id",
        "properties": {
          "from": {
            "type": "string",
          },
          "message": {
            "type": "string",
          },
        },
        "required": [
          "message",
          "from",
        ],
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })

  it('parse a openapi then omit extend', () => {
    const schema = z
      .object({
        message: z.string(),
      })
      .resource({
        name: 'User',
        slug: 'users',
        table_name: 'User',
        class_name: 'User',
        display_name: '员工',
        primary_key: 'id',
        visible: true,
        display_primary_key: 'false',
      })

    const schema2 = schema
      .omit({
        message: true,
      })
      .extend({
        from: z.string(),
      })
    const output = zodToOpenAPI(schema2)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_name": "员工",
        "display_primary_key": "false",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "from": {
            "type": "string",
          },
        },
        "required": [
          "from",
        ],
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })

  it('parse a openapi merge', () => {
    const schema1 = z
      .object({
        id1: z.string(),
      })
      .resource({
        name: 'User',
        slug: 'users',
        table_name: 'User',
        class_name: 'User',
        display_name: '员工 schema1',
        primary_key: 'id',
        visible: true,
        display_primary_key: 'false',
      })

    const schema2 = z
      .object({
        id2: z.string(),
      })
      .resource({
        name: 'User',
        slug: 'users',
        table_name: 'User',
        class_name: 'User',
        display_name: '员工 schema2',
        primary_key: 'id',
        visible: true,
        display_primary_key: 'false',
      })

    const schema = schema1.merge(schema2).resource({
      name: 'User',
      slug: 'users',
      table_name: 'User',
      class_name: 'User',
      display_name: '员工 merge',
      primary_key: 'id',
      visible: true,
      display_primary_key: 'false',
    })

    const output = zodToOpenAPI(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "class_name": "User",
        "display_name": "员工 merge",
        "display_primary_key": "false",
        "name": "User",
        "primary_key": "id",
        "properties": {
          "id1": {
            "type": "string",
          },
          "id2": {
            "type": "string",
          },
        },
        "required": [
          "id1",
          "id2",
        ],
        "slug": "users",
        "table_name": "User",
        "type": "object",
        "visible": true,
      }
    `)
  })
})
