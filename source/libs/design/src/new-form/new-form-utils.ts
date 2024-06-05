import { ResourceUI } from '@flowda/types'
import * as _ from 'radash'

export function getFormItemColumns(schema: ResourceUI) {
  return schema.columns.filter(col => {
    if (schema?.primary_key === col.name) return false
    if (!col.visible) return false
    if (col.column_type === 'reference' && col.reference?.reference_type === 'has_one') return false
    return col.access_type !== 'read_only'
  })
}

/**
 * suppress warning: uncontrolled input to be controlled
 */
export function getDefaultInitialValues(schema?: ResourceUI) {
  if (schema == null) return {}
  const ret = getFormItemColumns(schema)
  return _.objectify(
    ret,
    i => i.name,
    i => '',
  )
}
