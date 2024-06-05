import {
  agFilterSchema,
  handleContextMenuInputSchema,
  newFormUriSchema,
  taskUriInputSchema,
  treeGridUriQuerySchema,
} from '@flowda/types'
import { URI } from '@theia/core'
import * as qs from 'qs'
import { z } from 'zod'
import * as _ from 'radash'

export function getUriDisplayName(uri: URI): string {
  const query = qs.parse(uri.query)
  if (!('displayName' in query) || typeof query.displayName !== 'string')
    throw new Error(`query must have displayName and is string, ${uri.toString(true)}`)
  return query.displayName
}

export function getUriSchemaName(uri: string | URI): string {
  if (typeof uri === 'string') {
    uri = new URI(uri)
  }
  const query = qs.parse(uri.query)
  if (!('schemaName' in query) || typeof query.schemaName !== 'string')
    throw new Error(`query must have schemaName and is string, ${uri.toString(true)}`)
  return query.schemaName
}

export function createTreeGridUri(uri: string | URI, id: string, field: string) {
  if (typeof uri === 'string') {
    uri = new URI(uri)
  }
  const displayName = getUriDisplayName(uri)
  return new URI(
    `tree-grid://${uri.authority}?schemaName=${encodeURIComponent(
      `${getUriSchemaName(uri)}&displayName=${displayName}#${id}:${field}`,
    )}&id=${id}&field=${field}`,
  )
}

export function uriAsKey(uri: URI | string) {
  if (typeof uri === 'string') uri = new URI(uri)
  const query = qs.parse(uri.query)
  const { displayName, filterModel, ...rest } = query
  return `${uri.scheme}://${uri.authority}?${qs.stringify(rest)}`
}

export function uriWithoutId(uri: string) {
  return uri.slice(0, uri.lastIndexOf(':'))
}

export function extractId(id: string) {
  const count = parseInt(id.slice(id.lastIndexOf(':') + 1))
  return count
}

export function convertTreeGridUriToGridUri(uri: string | URI) {
  if (typeof uri === 'string') uri = new URI(uri)
  const query = getTreeUriQuery(uri)
  const displayName = query.displayName.split('#')[0]
  const gridUri = `grid://${uri.authority}?schemaName=${query.schemaName}&displayName=${displayName}`
  return gridUri
}

export function getTreeUriQuery(uri: string | URI) {
  if (typeof uri === 'string') uri = new URI(uri)
  const query = qs.parse(uri.query)
  const queryParsedRet = treeGridUriQuerySchema.parse(query)
  return queryParsedRet
}

export function createRefUri(input: z.infer<typeof handleContextMenuInputSchema>) {
  const uri = new URI(input.uri)
  if (input.column?.column_type !== 'reference')
    throw new Error(`column_type should be reference, ${input.column?.name}, ${input.column?.column_type}`)
  if (input.column.reference == null)
    throw new Error(`column_type reference should have reference, ${input.column.name}`)
  const id = input.cellRendererInput?.value?.[input.column.reference.primary_key]
  if (id == null) throw new Error(`column:${input.column.name} ${input.column.reference.primary_key} value is null`)
  const schemaName = `${input.column.reference.model_name}ResourceSchema`
  const query = {
    schemaName,
    displayName: input.column.reference.display_name,
    filterModel: {
      [input.column.reference.primary_key]: {
        filterType: 'number',
        type: 'equals',
        filter: id,
      },
    },
  }
  const retUri = `grid://${uri.authority}?${qs.stringify(query)}`
  return new URI(retUri)
}

export function getUriFilterModel(uri: URI | string): z.infer<typeof agFilterSchema> {
  if (typeof uri === 'string') {
    uri = new URI(uri)
  }
  const query = qs.parse(uri.query)
  const ret = qs.parse(query['filterModel'] as string) as z.infer<typeof agFilterSchema>
  return _.mapValues(ret, v => {
    if (v.filterType === 'number') v.filter = Number(v.filter)
    return v
  })
}

/**
 * @deprecated @see smartMergeFilterModel
 */
export function mergeUriFilterModel(
  uri: URI | string,
  filterModel: z.infer<typeof agFilterSchema>,
): z.infer<typeof agFilterSchema> {
  const origFilterModel = getUriFilterModel(uri)
  const ret = {
    ...origFilterModel,
    ...filterModel,
  }
  const ret2 = Object.keys(ret).reduce((acc, k) => {
    if (filterModel[k] === undefined) {
      return acc
    }
    const v = ret[k]
    if (v.filterType === 'number') v.filter = Number(v.filter)
    acc[k] = v
    return acc
  }, {} as z.infer<typeof agFilterSchema>)
  return ret2
}

// todo 配合 grid.model 调用处简化
export function updateUriFilterModel(uri: URI | string, paramsFilterModel: z.infer<typeof agFilterSchema>) {
  if (typeof uri === 'string') {
    uri = new URI(uri)
  }
  const { filterModel, ...rest } = qs.parse(uri.query) as qs.ParsedQs
  const query2 = {
    ...rest,
    filterModel: paramsFilterModel,
  }
  const query3 = qs.stringify(query2, { encode: false })
  const ret = uri.withQuery(query3)
  return ret
}

export function isUriLikeEqual(a: URI | string, b: URI | string) {
  if (typeof a === 'string') a = new URI(a)
  if (typeof b === 'string') b = new URI(b)
  return (
    a.scheme === b.scheme &&
    a.authority === b.authority &&
    a.path.toString() === b.path.toString() &&
    _.isEqual(qs.parse(a.query), qs.parse(b.query)) &&
    a.fragment === b.fragment
  )
}

export function isUriAsKeyLikeEqual(a: URI | string, b: URI | string) {
  if (typeof a === 'string') a = new URI(a)
  if (typeof b === 'string') b = new URI(b)
  return uriAsKey(a) === uriAsKey(b)
}

export function createAssociationUri(input: z.infer<typeof handleContextMenuInputSchema>) {
  if (input.association?.model_name == null) throw new Error('should be association')
  const uri = new URI(input.uri)
  const query = {
    schemaName: `${input.association?.model_name}ResourceSchema`,
    displayName: input.association.display_name,
    filterModel: {
      [input.association.foreign_key]: {
        filterType: 'number',
        type: 'equals',
        // @ts-expect-error ag-grid
        filter: input.cellRendererInput.data?.[input.association.primary_key],
      },
    },
  }
  const ret = `${uri.scheme}://${uri.authority}?${qs.stringify(query, { encode: false })}`
  return new URI(ret)
}

export function createTaskUri(input: z.infer<typeof handleContextMenuInputSchema>) {
  const uri = new URI(input.uri)
  const { id, taskDefinitionKey, name } = taskUriInputSchema.parse(input.cellRendererInput.data)
  const ret = `task://${uri.authority}?${qs.stringify(
    {
      taskDefinitionKey,
      taskId: id,
      displayName: name,
    },
    { encode: false },
  )}`
  return new URI(ret)
}

export function createNewFormUri(uri: string | URI) {
  if (typeof uri === 'string') {
    uri = new URI(uri)
  }
  const query = newFormUriSchema.parse(qs.parse(uri.query))

  const ret = `new-form://${uri.authority}?${qs.stringify(
    {
      schemaName: query.schemaName,
      displayName: '新增' + query.displayName,
    },
    { encode: false },
  )}`
  return new URI(ret)
}
