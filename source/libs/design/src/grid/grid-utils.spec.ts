import { getReferenceDisplay } from './grid-utils'

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
})
