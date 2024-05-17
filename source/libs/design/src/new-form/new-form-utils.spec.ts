import { ResourceUI } from '@flowda/types'
import * as TenantResourceSchema from './__fixtures__/tenantResourceSchema.json'
import { getDefaultInitialValues, getFormItemColumns } from './new-form-utils'

describe('new form utils', () => {
  it('form item columns', () => {
    const ret = getFormItemColumns(TenantResourceSchema as ResourceUI)
    expect(ret).toMatchInlineSnapshot(`
      [
        {
          "access_type": "read_write",
          "column_type": "String",
          "display_name": "租户唯一名称",
          "name": "name",
          "validators": [
            {
              "required": true,
            },
          ],
          "visible": true,
        },
        {
          "access_type": "read_write",
          "column_type": "String",
          "display_name": "租户显示名称",
          "name": "displayName",
          "validators": [
            {
              "required": true,
            },
          ],
          "visible": true,
        },
        {
          "access_type": "read_write",
          "column_type": "reference",
          "display_name": "Menu",
          "name": "menu",
          "reference": {
            "display_name": "Menu",
            "foreign_key": "tenantId",
            "model_name": "Menu",
            "primary_key": "id",
            "reference_type": "has_one",
            "visible": true,
          },
          "validators": [
            {
              "required": true,
            },
          ],
          "visible": true,
        },
      ]
    `)
  })

  it('default initial values', () => {
    const ret = getDefaultInitialValues(TenantResourceSchema as ResourceUI)
    expect(ret).toMatchInlineSnapshot(`
      {
        "displayName": "",
        "name": "",
      }
    `)
  })
})
