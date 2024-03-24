import { ColumnUISchema, PluginKeySchema } from './ui-schema-spec'

describe('ui schema spec', function () {
  it('PluginKeySchema', () => {
    const data = {
      'x-legacy': {},
    }
    const output = PluginKeySchema.parse(data)
    expect(output).toMatchInlineSnapshot(`
      {
        "x-legacy": {},
      }
    `)
  })
})
