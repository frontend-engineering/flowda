import 'reflect-metadata'
import { URI as Uri } from 'vscode-uri'
import { URI } from '@theia/core'
import {
  convertTreeGridUriToGridUri,
  createRefUri,
  createTreeGridUri,
  extractId,
  isUriLikeEqual,
  mergeUriFilterModel,
  updateUriFilterModel,
  uriAsKey,
  uriWithoutId,
} from './uri-utils'
import { handleContextMenuInputSchema } from '@flowda/types'
import { z } from 'zod'
import * as qs from 'qs'
import * as _ from 'radash'
/*

  foo://example.com:8042/over/there?name=ferret#nose
  \_/   \______________/\_________/ \_________/ \__/
   |           |            |            |        |
scheme     authority       path        query   fragment
   |   _____________________|__
  / \ /                        \
  urn:example:animal:ferret:nose

*/
describe('uri utils', () => {
  it('recentlyVisibleIds', () => {
    const recentlyVisibleIds = [
      // "resource-editor-opener:grid://flowda?schemaName%3DTenantResourceSchema%26displayName%3D%25E7%25A7%259F%25E6%2588%25B7%25E4%25BF%25A1%25E6%2581%25AF:1",
      'resource-editor-opener:grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3DMenu%26filterModel%5Bid%5D%5BfilterType%5D%3Dnumber%26filterModel%5Bid%5D%5Btype%5D%3Dequals%26filterModel%5Bid%5D%5Bfilter%5D%3D1:1',
    ]
    const uri =
      'grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3DMenu%26filterModel%5Bid%5D%5BfilterType%5D%3Dnumber%26filterModel%5Bid%5D%5Btype%5D%3Dequals%26filterModel%5Bid%5D%5Bfilter%5D%3D3'

    const ret = recentlyVisibleIds.find(id => {
      const uri1 = uriWithoutId(id.replace('resource-editor-opener:', ''))
      // console.log(uriAsKey(uri1))
      // console.log(uriAsKey(uri))
      return uriAsKey(uri1) === uriAsKey(uri)
    })
    expect(ret).toMatchInlineSnapshot(
      `"resource-editor-opener:grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3DMenu%26filterModel%5Bid%5D%5BfilterType%5D%3Dnumber%26filterModel%5Bid%5D%5Btype%5D%3Dequals%26filterModel%5Bid%5D%5Bfilter%5D%3D1:1"`,
    )
    expect(extractId(ret!)).toMatchInlineSnapshot(`1`)
  })

  it('uri like equal', () => {
    const a =
      'grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3DMenu%26filterModel%255Bid%255D%255BfilterType%255D%3Dnumber%26filterModel%255Bid%255D%255Btype%255D%3Dequals%26filterModel%255Bid%255D%255Bfilter%255D%3D3'
    const b =
      'grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3DMenu%26filterModel%5Bid%5D%5BfilterType%5D%3Dnumber%26filterModel%5Bid%5D%5Btype%5D%3Dequals%26filterModel%5Bid%5D%5Bfilter%5D%3D3'
    const uria = new URI(a)
    const urib = new URI(b)

    expect(uria.query).toEqual(uria.query)
    expect(isUriLikeEqual(uria, urib)).toBe(true)
  })

  it('create uri query from ag-grid filterModel', () => {
    const filterModel = {
      id: {
        filterType: 'number',
        type: 'equals',
        filter: 1,
      },
      name: {
        filterType: 'string',
        type: 'equals',
        filter: 'hi',
      },
    }
    const ret = qs.stringify(filterModel)
    expect(ret).toMatchInlineSnapshot(
      `"id%5BfilterType%5D=number&id%5Btype%5D=equals&id%5Bfilter%5D=1&name%5BfilterType%5D=string&name%5Btype%5D=equals&name%5Bfilter%5D=hi"`,
    )
  })

  it('update filterModel in uri query', () => {
    const filterModel = {
      id: {
        filterType: 'number',
        type: 'equals',
        filter: 1,
      },
    } as const
    const uri = 'grid://flowda?schemaName%3DTenantResourceSchema%26displayName%3D%E7%A7%9F%E6%88%B7%E4%BF%A1%E6%81%AF'
    const uri_ = new URI(uri)
    const ret = updateUriFilterModel(uri_, filterModel)
    const uriRet = ret.toString(true)
    console.log(uriRet)
    const uriRet_ = new URI(uriRet)
    expect(qs.parse(uriRet_.query)['filterModel']).toMatchInlineSnapshot(`
      {
        "id": {
          "filter": "1",
          "filterType": "number",
          "type": "equals",
        },
      }
    `)
    expect(ret).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "query": "schemaName=TenantResourceSchema&displayName=%E7%A7%9F%E6%88%B7%E4%BF%A1%E6%81%AF&filterModel%5Bid%5D%5BfilterType%5D=number&filterModel%5Bid%5D%5Btype%5D=equals&filterModel%5Bid%5D%5Bfilter%5D=1",
          "scheme": "grid",
        },
      }
    `)
  })

  it('merge filterModel in uri query', () => {
    const filterModel = {
      id: {
        filterType: 'number',
        type: 'equals',
        filter: 1,
      },
    } as const
    const uri = 'grid://flowda?schemaName%3DTenantResourceSchema%26displayName%3D%E7%A7%9F%E6%88%B7%E4%BF%A1%E6%81%AF'
    const uri_ = new URI(uri)
    const ret = mergeUriFilterModel(uri_, filterModel)
    expect(ret).toMatchInlineSnapshot(`
      {
        "id": {
          "filter": 1,
          "filterType": "number",
          "type": "equals",
        },
      }
    `)
  })

  it('merge filterModel in uri query', () => {
    const filterModel = {}
    const uri =
      'grid://flowda?schemaName%3DTenantResourceSchema%26displayName%3D%25E7%25A7%259F%25E6%2588%25B7%25E4%25BF%25A1%25E6%2581%25AF%26filterModel%255Bid%255D%255BfilterType%255D%3Dnumber%26filterModel%255Bid%255D%255Btype%255D%3Dequals%26filterModel%255Bid%255D%255Bfilter%255D%3D1'
    const uri_ = new URI(uri)
    const ret = mergeUriFilterModel(uri_, filterModel)
    expect(ret).toMatchInlineSnapshot(`{}`)
  })

  it('parse uri filterModel', () => {
    const query =
      'schemaName=MenuResourceSchema&displayName=%E8%8F%9C%E5%8D%95&filterModel%5Bid%5D%5BfilterType%5D=number&filterModel%5Bid%5D%5Btype%5D=equals&filterModel%5Bid%5D%5Bfilter%5D=3'
    const ret = qs.parse(query)
    expect(ret).toMatchInlineSnapshot(`
      {
        "displayName": "菜单",
        "filterModel": {
          "id": {
            "filter": "3",
            "filterType": "number",
            "type": "equals",
          },
        },
        "schemaName": "MenuResourceSchema",
      }
    `)
  })

  it('create reference uri', () => {
    const handleContextInput: z.infer<typeof handleContextMenuInputSchema> = {
      uri: 'grid://flowda?schemaName%3DTenantResourceSchema%26displayName%3D%E7%A7%9F%E6%88%B7%E4%BF%A1%E6%81%AF',
      cellRendererInput: {
        value: {
          id: 1,
        },
        data: {
          id: '2',
        },
        valueFormatted: null,
        colDef: {
          field: 'menu',
        },
      },
      column: {
        column_type: 'reference',
        display_name: 'Menu',
        name: 'menu',
        validators: [
          {
            required: true,
          },
        ],
        reference: {
          display_name: 'Menu',
          model_name: 'Menu',
          reference_type: 'has_one',
          foreign_key: 'tenantId',
          primary_key: 'id',
        },
      },
    }
    const ret = createRefUri(handleContextInput)
    expect(ret).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "query": "schemaName=MenuResourceSchema&displayName=Menu&filterModel[id][filterType]=number&filterModel[id][type]=equals&filterModel[id][filter]=1",
          "scheme": "grid",
        },
      }
    `)
  })

  it('vscode uri', () => {
    // const uri = 'resource.flowda.MenuResourceSchema:///菜单'
    const uri = 'urn:example:animal:ferret:nose'
    const output = Uri.parse(uri)
    console.log(output)
    expect(output).toMatchInlineSnapshot(`
      {
        "$mid": 1,
        "path": "example:animal:ferret:nose",
        "scheme": "urn",
      }
    `)
    const uri2 = 'foo://example.com:8042/over/there?name=ferret#nose'
    const output2 = Uri.parse(uri2)
    console.log(output2)
    expect(output2).toMatchInlineSnapshot(`
      {
        "$mid": 1,
        "authority": "example.com:8042",
        "fragment": "nose",
        "path": "/over/there",
        "query": "name=ferret",
        "scheme": "foo",
      }
    `)
  })

  it('@theia/core Uri', () => {
    // resource.flowda.MenuResourceSchema:///菜单
    // todo: 目前 path 是给 displayName 用的，但是可以换成 LabelProvider.getName
    // 因为 path 目前其实用不到，没必要强行 adapt 到 path
    const rawUri = 'grid://flowda/menu?schema=MenuResourceSchema'
    const uri = new URI(rawUri)
    expect(uri).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "path": "/menu",
          "query": "schema=MenuResourceSchema",
          "scheme": "grid",
        },
      }
    `)
    console.log(uri)
    // todo: 换成 LabelProvider.getName 试试看
    console.log(uri.displayName)
    // 用不到
    console.log(uri.parent)
    expect(uri.parent).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "path": "/",
          "query": "schema=MenuResourceSchema",
          "scheme": "grid",
        },
      }
    `)
    expect(uri.withScheme('foo')).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "path": "/menu",
          "query": "schema=MenuResourceSchema",
          "scheme": "foo",
        },
      }
    `)

    expect(uri.scheme).toMatchInlineSnapshot(`"grid"`)
  })

  it('grid uri', () => {
    // resource.flowda.MenuResourceSchema:///菜单
    const rawUri = 'grid://flowda?schema=MenuResourceSchema'
    const output = Uri.parse(rawUri)
    console.log(output)
    expect(output).toMatchInlineSnapshot(`
      {
        "$mid": 1,
        "authority": "flowda",
        "query": "schema=MenuResourceSchema",
        "scheme": "grid",
      }
    `)

    const uri = new URI(rawUri)
    console.log(uri)
  })

  it('tree grid uri', () => {
    const uri = 'grid://flowda?schemaName=MenuResourceSchema&displayName=菜单'
    const output = createTreeGridUri(new URI(uri), '1', 'menuData')
    console.log(output)
    expect(output.toString(true)).toMatchInlineSnapshot(
      `"tree-grid://flowda?schemaName=MenuResourceSchema&displayName=菜单%231:menuData&id=1&field=menuData"`,
    )
  })

  it('isUriEqual', () => {
    const a = 'grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3D%E8%8F%9C%E5%8D%95:1'
    const b = 'grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3D%E8%8F%9C%E5%8D%95'
    expect(uriWithoutId(a)).toEqual(b)

    const aUri = new URI(a)
    const bUri = new URI(b)
    const ret = aUri === bUri
    expect(aUri).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "query": "schemaName=MenuResourceSchema&displayName=菜单:1",
          "scheme": "grid",
        },
      }
    `)
    expect(bUri).toMatchInlineSnapshot(`
      URI {
        "codeUri": {
          "$mid": 1,
          "authority": "flowda",
          "query": "schemaName=MenuResourceSchema&displayName=菜单",
          "scheme": "grid",
        },
      }
    `)
  })

  it('tree grid uri -> gri uri', () => {
    const treeGridUri =
      'tree-grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3D%E8%8F%9C%E5%8D%95%233%3AtreeData%26id%3D3%26field%3DtreeData'
    const gridUri = convertTreeGridUriToGridUri(treeGridUri)
    console.log(gridUri)
    expect(gridUri).toMatchInlineSnapshot(`"grid://flowda?schemaName=MenuResourceSchema&displayName=菜单"`)
  })
})
