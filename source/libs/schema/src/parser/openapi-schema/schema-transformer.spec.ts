import { SchemaTransformer } from './schema-transformer'

describe('schema transformer', function () {
  it('case', () => {
    const output = new SchemaTransformer()
      .set(<any>{
        key_type: 'resource',
        'x-legacy': {
          route_prefix: '/resources/sites',
        },
        name: 'Site',
        properties: {
          editableUrl: {
            display_name: '可编辑链接',
            key_type: 'column',
            'x-legacy': {
              override_type: 'text',
              prisma: 'false',
            },
            type: 'string',
          },
        },
        required: ['editableUrl'],
        type: 'object',
      })
      .toJSON()
    expect(output).toMatchInlineSnapshot(`
      {
        "associations": [],
        "columns": [
          {
            "column_type": "string",
            "display_name": "可编辑链接",
            "name": "editableUrl",
            "reference": undefined,
            "validators": [
              {
                "required": true,
              },
            ],
            "x-legacy": {
              "override_type": "text",
              "prisma": "false",
            },
          },
        ],
        "name": "Site",
        "type": "object",
        "x-legacy": {
          "route_prefix": "/resources/sites",
        },
      }
    `)
  })
})
