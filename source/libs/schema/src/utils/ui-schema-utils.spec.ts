import { ignoredSuffix } from './ui-schema-utils'

describe('ui schema utils', () => {
  it('ignoredSuffix', () => {
    expect(ignoredSuffix).toMatchInlineSnapshot(`
      [
        "TransactionIsolationLevelSchema",
        "ScalarFieldEnumSchema",
        "SortOrderSchema",
        "DecimalJSLike",
        "NullableJsonNullValueInput",
        "JsonNullValueInput",
        "NullsOrder",
        "JsonNullValueFilter",
        "DynamicColumnType",
      ]
    `)
  })
})
