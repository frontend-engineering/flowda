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

  it('parse a object zod schema', () => {
    const schema = z
      .object({
        message: z.string(),
      })
      .openapi({ description: 'hello world!', example: 'hello world' })
    const output = zodToOpenAPI(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "hello world!",
        "example": "hello world",
        "properties": {
          "message": {
            "type": "string",
          },
        },
        "required": [
          "message",
        ],
        "type": "object",
      }
    `)
  })
})
