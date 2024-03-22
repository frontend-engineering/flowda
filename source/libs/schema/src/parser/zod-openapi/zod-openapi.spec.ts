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
})
