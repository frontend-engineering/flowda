import { z } from 'zod'
import { createDocument } from 'zod-openapi'
import { stringify } from 'yaml'
import { extendZod } from '../index'

extendZod(z)

describe('zod openapi', () => {
  it('generate openapi doc', () => {
    const schema = z.string().openapi({
      key_type: 'column',
      column_type: 'String',
      display_name: 'Hello',
      description: 'hello world!',
      example: 'hello world',
    })

    const document = createDocument({
      openapi: '3.0.0',
      info: {
        title: 'Open API',
        version: '0.0.0',
      },
      paths: {
        '/apps/hello': {
          get: {
            operationId: 'Say Hello',
            description: 'Say hello',
            tags: ['Apps'],
            responses: {
              '200': {
                description: '200 OK',
                content: {
                  'application/json': { schema: schema },
                },
              },
            },
          },
        },
      },
    })
    const yaml = stringify(document, { aliasDuplicateObjects: false })
    expect(yaml).toMatchInlineSnapshot(`
      "openapi: 3.0.0
      info:
        title: Open API
        version: 0.0.0
      paths:
        /apps/hello:
          get:
            operationId: Say Hello
            description: Say hello
            tags:
              - Apps
            responses:
              "200":
                description: 200 OK
                content:
                  application/json:
                    schema:
                      type: string
                      key_type: column
                      column_type: String
                      display_name: Hello
                      description: hello world!
                      example: hello world
      "
    `)
  })
})
