import { z } from 'zod'
import { extendZodWithOpenApi, generateSchema as zodToOpenAPI } from '@anatine/zod-openapi'

extendZodWithOpenApi(z)
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
})
