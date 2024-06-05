import 'reflect-metadata'
import { getReferenceDisplay, shortenDatetime, smartMergeFilterModel } from './grid-utils'

describe('grid utils', () => {
  it('reference display', () => {
    const colUi = {
      display_name: 'Menu',
      model_name: 'Menu',
      reference_type: 'has_one',
      foreign_key: 'tenantId',
      primary_key: 'id',
      visible: true,
    } as const

    const val = {
      id: 2,
      createdAt: '2023-12-20T05:34:11.683Z',
      updatedAt: '2024-02-22T09:10:06.610Z',
      isDeleted: true,
      treeData: [
        {
          id: '0wr0',
          name: '网站',
          slug: 'site',
          children: [
            {
              id: 'tSFF',
              name: '部署',
              slug: 'deploy',
            },
            {
              id: 'PWtb',
              name: '域名绑定',
              slug: 'domain',
            },
          ],
        },
        {
          id: 'quva',
          name: '模板',
          slug: 'template',
          children: [
            {
              id: 'pM4k',
              name: '模板编辑',
              slug: 'template_edit',
            },
          ],
        },
      ],
      tenantId: 3,
    }
    const ret = getReferenceDisplay(colUi, val)
    expect(ret).toMatchInlineSnapshot(`"has_one Menu#2"`)
  })

  it('shortenDatetime', () => {
    const ret = shortenDatetime('2024-04-22 11:33:55')
    expect(ret).toMatchInlineSnapshot(`"04-22 11:33"`)

    const ret2 = shortenDatetime('2023-04-22 11:33:55')
    expect(ret2).toMatchInlineSnapshot(`"23-04-22 11:33"`)
  })
  it('smartMergeFilterModel params.filter cover uri filterModel', () => {
    const uri =
      'file:///TenantResourceSchema?filterModel[displayName][filterType]=text&filterModel[displayName][type]=contains&filterModel[displayName][filter]=c'
    const ret = smartMergeFilterModel(uri, {}, false)
    expect(ret).toMatchInlineSnapshot(`{}`)
  })

  it('smartMergeFilterModel params.filter cover uri filterModel case 2', () => {
    const uri =
      'file:///TenantResourceSchema?filterModel[displayName][filterType]=text&filterModel[displayName][type]=contains&filterModel[displayName][filter]=c'
    const filterModel = {
      displayName: {
        filterType: 'text',
        type: 'contains',
        filter: 'ccc',
      },
    } as const
    const ret = smartMergeFilterModel(uri, filterModel, false)
    expect(ret).toMatchInlineSnapshot(`
      {
        "displayName": {
          "filter": "ccc",
          "filterType": "text",
          "type": "contains",
        },
      }
    `)
  })

  it('smartMergeFilterModel params.filter use uri', () => {
    const uri =
      'file:///TenantResourceSchema?filterModel[displayName][filterType]=text&filterModel[displayName][type]=contains&filterModel[displayName][filter]=c'
    const filterModel = {
      displayName: {
        filterType: 'text',
        type: 'contains',
        filter: 'ccc',
      },
    } as const
    const ret = smartMergeFilterModel(uri, filterModel, true)
    expect(ret).toMatchInlineSnapshot(`
      {
        "displayName": {
          "filter": "c",
          "filterType": "text",
          "type": "contains",
        },
      }
    `)
  })
})
