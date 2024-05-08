import { SchemaTransformer } from './schema-transformer'

describe('schema transformer', function () {
  it('case', () => {
    const output = new SchemaTransformer()
      .set(<any>{
        plugins: {
          legacy: {
            route_prefix: '/resources/sites',
          },
        },
        name: 'Site',
        properties: {
          extendedDescriptionData: {
            display_name: 'Extended Description Data',
            nullable: true,
            column_type: 'Json',
            visible: true,
          },
          editableUrl: {
            display_name: '可编辑链接',
            plugins: {
              legacy: {
                override_type: 'text',
                prisma: 'false',
              },
            },
            column_type: 'String',
            visible: true,
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
            "access_type": "read_write",
            "column_type": "Json",
            "display_name": "Extended Description Data",
            "name": "extendedDescriptionData",
            "reference": undefined,
            "validators": [],
            "visible": true,
          },
          {
            "access_type": "read_write",
            "column_type": "String",
            "display_name": "可编辑链接",
            "name": "editableUrl",
            "plugins": {
              "legacy": {
                "override_type": "text",
                "prisma": "false",
              },
            },
            "reference": undefined,
            "validators": [
              {
                "required": true,
              },
            ],
            "visible": true,
          },
        ],
        "name": "Site",
        "plugins": {
          "legacy": {
            "route_prefix": "/resources/sites",
          },
        },
        "type": "object",
      }
    `)
  })
})
