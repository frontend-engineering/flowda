import { treeGridUriQuerySchema } from '@flowda/types'
import { URI } from '@theia/core'
import * as qs from 'qs'

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


/**
 * @deprecated
 */
export function uriWithoutId(uri: string) {
    return uri.slice(0, uri.lastIndexOf(':'))
}

export function convertTreeGridUriToGridUri(uriParam: string) {
    const uri = new URI(uriParam)
    const query = qs.parse(uri.query)
    const queryParsedRet = treeGridUriQuerySchema.parse(query)
    const displayName = queryParsedRet.displayName.split('#')[0]
    const gridUri = `grid://${uri.authority}?schemaName=${query.schemaName}&displayName=${displayName}`
    return gridUri
}