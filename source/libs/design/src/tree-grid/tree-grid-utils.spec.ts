import { treeDataInput } from './__features__/tree-data'
import { convertMenuDataToAgTreeData, convertAgTreeDataToTreeData, stringifyMenuData } from './tree-grid-utils'

describe('tree grid utils', () => {
  it('convert tree data to ag-grid tree data', () => {
    const ret = convertMenuDataToAgTreeData(treeDataInput)
    // console.log(ret)
    expect(ret).toMatchInlineSnapshot(`
      [
        {
          "hierarchy": [
            "v6fB",
          ],
          "id": "v6fB",
          "name": "租户管理",
          "slug": "tenant_admin",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
          ],
          "id": "28Eq",
          "name": "租户和用户",
          "slug": "tenant",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
            "7mjf",
          ],
          "id": "7mjf",
          "name": "租户信息",
          "slug": "tenants",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
            "aSYt",
          ],
          "id": "aSYt",
          "name": "菜单",
          "slug": "menus",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
            "FfOe",
          ],
          "id": "FfOe",
          "name": "用户",
          "slug": "users",
        },
        {
          "hierarchy": [
            "HD0U",
          ],
          "id": "HD0U",
          "name": "常用工具",
          "slug": "utilities",
        },
        {
          "hierarchy": [
            "HD0U",
            "a2MH",
          ],
          "id": "a2MH",
          "name": "通知",
          "slug": "notification",
        },
        {
          "hierarchy": [
            "HD0U",
            "a2MH",
            "b0yA",
          ],
          "id": "b0yA",
          "name": "短信通知",
          "slug": "sent_sms",
        },
        {
          "hierarchy": [
            "HD0U",
            "jOej",
          ],
          "id": "jOej",
          "name": "日志",
          "slug": "log",
        },
        {
          "hierarchy": [
            "HD0U",
            "jOej",
            "ZcjG",
          ],
          "id": "ZcjG",
          "name": "异常日志",
          "slug": "request_error_logs",
        },
      ]
    `)
  })
  it('convert back tree data to menu data', () => {
    const input = convertMenuDataToAgTreeData(treeDataInput)
    const output = convertAgTreeDataToTreeData(input)
    // 通过 cloneDeep 确保不要 inplace edit
    expect(input).toMatchInlineSnapshot(`
      [
        {
          "hierarchy": [
            "v6fB",
          ],
          "id": "v6fB",
          "name": "租户管理",
          "slug": "tenant_admin",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
          ],
          "id": "28Eq",
          "name": "租户和用户",
          "slug": "tenant",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
            "7mjf",
          ],
          "id": "7mjf",
          "name": "租户信息",
          "slug": "tenants",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
            "aSYt",
          ],
          "id": "aSYt",
          "name": "菜单",
          "slug": "menus",
        },
        {
          "hierarchy": [
            "v6fB",
            "28Eq",
            "FfOe",
          ],
          "id": "FfOe",
          "name": "用户",
          "slug": "users",
        },
        {
          "hierarchy": [
            "HD0U",
          ],
          "id": "HD0U",
          "name": "常用工具",
          "slug": "utilities",
        },
        {
          "hierarchy": [
            "HD0U",
            "a2MH",
          ],
          "id": "a2MH",
          "name": "通知",
          "slug": "notification",
        },
        {
          "hierarchy": [
            "HD0U",
            "a2MH",
            "b0yA",
          ],
          "id": "b0yA",
          "name": "短信通知",
          "slug": "sent_sms",
        },
        {
          "hierarchy": [
            "HD0U",
            "jOej",
          ],
          "id": "jOej",
          "name": "日志",
          "slug": "log",
        },
        {
          "hierarchy": [
            "HD0U",
            "jOej",
            "ZcjG",
          ],
          "id": "ZcjG",
          "name": "异常日志",
          "slug": "request_error_logs",
        },
      ]
    `)
    expect(output).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "id": "7mjf",
                  "name": "租户信息",
                  "slug": "tenants",
                },
                {
                  "id": "aSYt",
                  "name": "菜单",
                  "slug": "menus",
                },
                {
                  "id": "FfOe",
                  "name": "用户",
                  "slug": "users",
                },
              ],
              "id": "28Eq",
              "name": "租户和用户",
              "slug": "tenant",
            },
          ],
          "id": "v6fB",
          "name": "租户管理",
          "slug": "tenant_admin",
        },
        {
          "children": [
            {
              "children": [
                {
                  "id": "b0yA",
                  "name": "短信通知",
                  "slug": "sent_sms",
                },
              ],
              "id": "a2MH",
              "name": "通知",
              "slug": "notification",
            },
            {
              "children": [
                {
                  "id": "ZcjG",
                  "name": "异常日志",
                  "slug": "request_error_logs",
                },
              ],
              "id": "jOej",
              "name": "日志",
              "slug": "log",
            },
          ],
          "id": "HD0U",
          "name": "常用工具",
          "slug": "utilities",
        },
      ]
    `)
  })
})
