import { ColumnUISchema, PluginKeySchema } from './ui-schema-spec'

describe('ui schema spec', function () {
  it('PluginKeySchema', () => {
    const data = {
      'x-legacy': {},
    }
    const output = PluginKeySchema.safeParse(data)
    if (!output.success) throw new Error('test error')
    expect(output.data).toMatchInlineSnapshot(`
    {
      "x-legacy": {},
    }
  `)
  })
})
