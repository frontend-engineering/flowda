import { z } from 'zod'
import { extendZod, zodToOpenAPI } from './index'

extendZod(z)
describe('zod openapi', () => {
  it('parse a simple zod schema', () => {
    const schema = z.string().openapi({ description: 'hello world!', example: 'hello world' })
    const output = zodToOpenAPI(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "hello world!",
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
      .openapi({
        name: 'from schema 1',
      })
    const schema2 = schema
      .extend({
        from: z.string(),
      })
      .openapi({ description: 'from schema 2' })
    const output = zodToOpenAPI(schema2)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "from schema 2",
        "name": "from schema 1",
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
        "type": "object",
      }
    `)
  })

  it('parse a openapi then omit extend', () => {
    const schema = z
      .object({
        message: z.string(),
      })
      .openapi({
        name: 'from schema 1',
      })
    const schema2 = schema
      .omit({
        message: true,
      })
      .extend({
        from: z.string(),
      })
      .openapi({ description: 'from schema 2' })
    const output = zodToOpenAPI(schema2)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "from schema 2",
        "name": "from schema 1",
        "properties": {
          "from": {
            "type": "string",
          },
        },
        "required": [
          "from",
        ],
        "type": "object",
      }
    `)
  })

  it('parse a openapi merge', () => {
    const schema1 = z
      .object({
        id1: z.string(),
      })
      .openapi({
        name: 'from schema 1',
      })

    const schema2 = z
      .object({
        id2: z.string(),
      })
      .openapi({
        example: 'from schema 2',
      })

    const schema = schema1.merge(schema2).openapi({ description: 'final schema' })

    const output = zodToOpenAPI(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "final schema",
        "example": "from schema 2",
        "name": "from schema 1",
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
        "type": "object",
      }
    `)
  })
})
