import {
  AssociationKey,
  AssociationKeySchema,
  ColumnUISchema,
  ColumUI,
  PluginKeySchema,
  ReferenceKeySchema,
  ResourceKey,
} from '@flowda/types'
import * as _ from 'radash'

export class SchemaTransformer {
  private jsonschema?: ResourceKey
  private columns?: ColumUI[]
  private associations?: AssociationKey[]

  set(jsonschema: ResourceKey) {
    this.jsonschema = jsonschema
    const processed = processJsonschema(jsonschema)
    this.columns = processed.columns
    this.associations = processed.associations
    return this
  }

  toJSON() {
    if (!this.jsonschema) throw new Error(`No jsonschema set`)
    return _.omit({
      ...this.jsonschema,
      properties: undefined,
      required: undefined,
      columns: this.columns,
      associations: this.associations,
    }, ['properties', 'required'])
  }
}

export function processJsonschema(jsonschema: ResourceKey) {
  if (jsonschema.properties == null)
    throw new Error(`no properties, ${jsonschema.class_name}`)

  const props = jsonschema.properties
  const refCols = Object.keys(props).filter(k => {
    const prop = props[k]
    if ('model_name' in prop && 'reference_type' in prop) {
      return prop.model_name && prop.reference_type
    }
    return false
  }).map(k => {
    const prop = props[k]
    const ret = ReferenceKeySchema.safeParse(prop)
    if (!ret.success)
      throw new Error(`reference parse error, k:${k}, prop: ${JSON.stringify(prop)}, error: ${ret.error.message}`)
    return ret.data
  })

  return Object.keys(props).reduce((acc, cur) => {
    const prop = props[cur]
    if ('reference_type' in prop && prop.reference_type === 'belongs_to') {
      // reference 忽略，在 foreign_key column 附着在 reference 上
      return acc
    }
    if ('model_name' in prop && !('reference_type' in prop)) {
      const ret = AssociationKeySchema.safeParse({
        ...prop,
        name: cur,
      })
      if (!ret.success)
        throw new Error(`association parse error, k:${cur}, prop: ${JSON.stringify(prop)}, error: ${ret.error.message}`)
      acc.associations.push(ret.data)
      return acc
    }
    const ref = refCols.find(r => r.foreign_key === cur)
    let colParseRet
    if ('reference_type' in prop && prop.reference_type === 'has_one') {
      colParseRet = ColumnUISchema.safeParse({
        column_type: 'reference',
        display_name: prop.display_name,
        //            ^?
        validators: [],
        name: cur,
        reference: prop,
      })
    } else if ('column_type' in prop) {
      colParseRet = ColumnUISchema.safeParse({
        ...prop,
        name: cur,
        validators: [],
        reference: ref,
      })
    } else {
      throw new Error(`unknown branch, ${JSON.stringify(prop)}`)
    }
    if (!colParseRet.success)
      throw new Error(`column parse error, k:${cur}, prop: ${JSON.stringify(prop)}, error: ${colParseRet.error.message}`)

    const colPlugin = PluginKeySchema.parse(prop)
    const col = colParseRet.data
    if (jsonschema.required && jsonschema.required.indexOf(cur) > -1) {
      if (!col.validators) col.validators = []
      col.validators.push({
        required: true,
      })
    }
    acc.columns.push({
      ...col,
      ...colPlugin,
    })
    return acc
  }, {
    columns: [],
    associations: [],
  } as {
    columns: ColumUI[],
    associations: AssociationKey[]
  })
}
