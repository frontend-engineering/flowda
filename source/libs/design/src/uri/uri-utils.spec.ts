import 'reflect-metadata'
import { URI as Uri } from 'vscode-uri'
import * as qs from 'qs'
import { URI } from '@theia/core'
import { createTreeGridUri, uriWithoutId } from './uri-utils'
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
    const uri = 'grid://flowda?schemaName=MenuResourceSchema'
    const output = createTreeGridUri(new URI(uri), '1', 'menuData')
    console.log(output)
    expect(output).toMatchInlineSnapshot(`"tree-grid://flowda?schema=MenuResourceSchema&id=1&field=menuData"`)
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
})
