import { getChangedValues } from './task-form-utils'
describe('task form utils', () => {
    describe('getChangedValues', () => {
        it('basic', () => {
            const next = {
                a: 'a',
                b: 'b',
            }
            const initial = {
                a: 'aa',
                b: 'b',
            }
            const ret = getChangedValues(next, initial)
            expect(ret).toMatchInlineSnapshot(`
              {
                "a": "a",
              }
            `)
        })

        it('ignoreEmptyString true', () => {
            const next = {
                a: '',
                b: 'b',
            }
            const initial = {
                a: null,
                b: 'b',
            }
            const ret = getChangedValues(next, initial)
            expect(ret).toMatchInlineSnapshot(`{}`)
        })

        it('ignoreEmptyString false', () => {
            const next = {
                a: '',
                b: 'b',
            }
            const initial = {
                a: null,
                b: 'b',
            }
            const ret = getChangedValues(next, initial, {
                ignoreEmptyString: false,
            })
            expect(ret).toMatchInlineSnapshot(`
        {
          "a": "",
        }
      `)
        })
    })
})
