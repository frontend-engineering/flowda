import { builtinPluginSchema } from './plugin-builtin'
describe('builtin plugin', () => {
  it('parse', () => {
    const input = { open_task: true }
    const ret = builtinPluginSchema.safeParse(input)
    if (ret.success) {
      expect(ret.data).toMatchInlineSnapshot(`
        {
          "open_task": true,
        }
      `)
    }
  })
})
