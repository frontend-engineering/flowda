import { agFilterSchema, handleContextMenuInputSchema, treeGridUriQuerySchema } from '@flowda/types'
import { URI } from '@theia/core'
import * as qs from 'qs'
import { z } from 'zod'
import * as _ from 'radash'

export function getUriDisplayName(uri: URI): string {
    const query = qs.parse(uri.query)
    if (!('displayName' in query) || typeof query.displayName !== 'string') throw new Error(`query must have displayName and is string, ${uri.toString()}`)
    return query.displayName
}

export function getUriSchemaName(uri: URI): string {
    const query = qs.parse(uri.query)
    if (!('schemaName' in query) || typeof query.schemaName !== 'string') throw new Error(`query must have schemaName and is string, ${uri.toString()}`)
    return query.schemaName
}

export function createTreeGridUri(uri: string | URI, id: string, field: string) {
    if (typeof uri === 'string') {
        uri = new URI(uri)
    }
    const displayName = getUriDisplayName(uri)
    return new URI(`tree-grid://${uri.authority}?schemaName=${encodeURIComponent(`${getUriSchemaName(uri)}&displayName=${displayName}#${id}:${field}`)}&id=${id}&field=${field}`)
}

export function uriAsKey(uri: URI) {
    const query = qs.parse(uri.query)
    const { displayName, filterModel, ...rest } = query
    return `${uri.scheme}://${uri.authority}?${qs.stringify(rest)}`
}

export function uriWithoutId(uri: string) {
    return uri.slice(0, uri.lastIndexOf(':'))
}

export function convertTreeGridUriToGridUri(uriParam: string) {
    const query = getTreeUriQuery(uriParam)
    const uri = new URI(uriParam)
    const displayName = query.displayName.split('#')[0]
    const gridUri = `grid://${uri.authority}?schemaName=${query.schemaName}&displayName=${displayName}`
    return gridUri
}

export function getTreeUriQuery(uriParam: string) {
    const uri = new URI(uriParam)
    const query = qs.parse(uri.query)
    const queryParsedRet = treeGridUriQuerySchema.parse(query)
    return queryParsedRet
}

export function createRefUri(input: z.infer<typeof handleContextMenuInputSchema>) {
    const uri = new URI(input.uri)
    if (input.column.column_type !== 'reference') throw new Error(`column_type should be reference, ${input.column.name}, ${input.column.column_type}`)
    if (input.column.reference == null) throw new Error(`column_type reference should have reference, ${input.column.name}`)
    const id = input.cellRendererInput?.value?.[input.column.reference.primary_key]
    if (id == null) throw new Error(`column:${input.column.name} ${input.column.reference.primary_key} value is null`)
    const schemaName = input.column.reference.model_name
    //    ^?
    const retUri = `grid://${uri.authority}?schemaName=${schemaName}ResourceSchema&displayName=${input.column.reference.display_name}&${input.column.reference.primary_key}=${id}`
    return new URI(retUri)
}

export function mergeUriFilterModel(uri: URI | string, filterModel: z.infer<typeof agFilterSchema>): z.infer<typeof agFilterSchema> {
    if (typeof uri === 'string') {
        uri = new URI(uri)
    }
    const query = qs.parse(uri.query)
    const origFilterModel = qs.parse(query['filterModel'] as string) as z.infer<typeof agFilterSchema>
    const ret = {
        ...origFilterModel,
        ...filterModel,
    }
    // _.mapValues(ret, (v) => {
    //     if (v?.filterType === 'number') v.filter = Number(v.filter)
    //     return v
    // })
    return ret
}

export function updateUriFilterModel(uri: URI | string, filterModel: z.infer<typeof agFilterSchema>) {
    if (typeof uri === 'string') {
        uri = new URI(uri)
    }
    const query = qs.parse(uri.query)
    const query2 = {
        ...query,
        filterModel
    }
    const ret = uri.withQuery(qs.stringify(query2))
    return ret
}