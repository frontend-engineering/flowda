import { z } from 'zod'
import { generateSchema } from './zod-openapi'
import { extendZodWithOpenApi } from './extend-zod'

extendZodWithOpenApi(z)
describe('zod openapi', () => {

  it('parse a simple zod schema', () => {
    const schema = z.string().openapi({ description: 'hello world!', example: 'hello world' })
    const output = generateSchema(schema)
    expect(output).toMatchInlineSnapshot(`
      {
        "description": "hello world!",
        "example": "hello world",
        "type": "string",
      }
    `)
  })
})
