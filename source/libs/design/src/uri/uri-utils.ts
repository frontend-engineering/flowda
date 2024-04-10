import { type URI } from '@theia/core'
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