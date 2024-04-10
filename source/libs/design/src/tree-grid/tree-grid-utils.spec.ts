import { treeDataInput } from './__features__/tree-data'
import { convertMenuDataToAgTreeData } from './tree-grid-utils'
import { getData } from './__stories__/getData'

describe('tree grid utils', () => {
  it('convert tree data to ag-grid tree data', () => {
    const ret = convertMenuDataToAgTreeData(treeDataInput)
    console.log(ret)
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
            "J8XJ",
          ],
          "id": "J8XJ",
          "name": "订单",
          "slug": "order_admin",
        },
        {
          "hierarchy": [
            "J8XJ",
            "6v6G",
          ],
          "id": "6v6G",
          "name": "产品",
          "slug": "product",
        },
        {
          "hierarchy": [
            "J8XJ",
            "6v6G",
            "QoBb",
          ],
          "id": "QoBb",
          "name": "产品列表",
          "slug": "products",
        },
        {
          "hierarchy": [
            "J8XJ",
            "ZzOq",
          ],
          "id": "ZzOq",
          "name": "订单和支付",
          "slug": "order",
        },
        {
          "hierarchy": [
            "J8XJ",
            "ZzOq",
            "m21G",
          ],
          "id": "m21G",
          "name": "订单列表",
          "slug": "orders",
        },
        {
          "hierarchy": [
            "J8XJ",
            "ZzOq",
            "J3zM",
          ],
          "id": "J3zM",
          "name": "支付列表",
          "slug": "pays",
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
})
