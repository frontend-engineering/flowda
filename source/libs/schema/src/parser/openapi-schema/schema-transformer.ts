import { ExtendSchemaObject } from '@anatine/zod-openapi'
import { AssociationKeySchema, ColumnUISchema, ReferenceKeySchema } from '@flowda/types'
import { z } from 'zod'
import * as _ from 'radash'
import { SchemaObject } from 'openapi3-ts'

export class SchemaTransformer {
  private jsonschema?: SchemaObject
  private columns?: Omit<z.infer<typeof ColumnUISchema>, 'key_type'>[]
  private associations?: Omit<z.infer<typeof AssociationKeySchema>, 'key_type'>[]

  set(jsonschema: ExtendSchemaObject) {
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
      key_type: undefined,
      columns: this.columns,
      associations: this.associations,
    }, ['properties', 'required', 'key_type'])
  }
}

export function processJsonschema(jsonschema: ExtendSchemaObject) {
  if (!jsonschema.properties) throw new Error(`No properties of ${jsonschema.name}`)
  const props = jsonschema.properties

  const refCols = Object.keys(props).filter(k => {
    const prop: ExtendSchemaObject = props[k] as ExtendSchemaObject
    if (prop.key_type === 'reference') {
      return prop.model_name && prop.reference_type
    }
    return false
  }).map(k => {
    const prop = props[k] as ExtendSchemaObject
    return _.omit(ReferenceKeySchema.parse(prop), ['key_type'])
  })

  return Object.keys(props).reduce((acc, cur) => {
    // 找不到强类型的更舒适的方法，直接 type cast
    const prop = props[cur] as ExtendSchemaObject
    if (prop.key_type === 'reference') {
      // reference 忽略，在 foreign_key column 附着在 reference 上
      return acc
    }
    if (prop.key_type === 'association') {
      acc.associations.push(_.omit(AssociationKeySchema.parse(prop), ['key_type']))
      return acc
    }

    const ref = refCols.find(r => r.foreign_key === cur)
    const col = ColumnUISchema.parse({
      ...prop,
      column_type: prop.type,
      validators: [],
      reference: ref,
    })
    if (jsonschema.required && jsonschema.required.indexOf(cur) > -1) {
      col.validators.push({
        required: true,
      })
    }
    acc.columns.push(_.omit(col, ['key_type']))
    return acc
  }, {
    columns: [],
    associations: [],
  } as {
    columns: Omit<z.infer<typeof ColumnUISchema>, 'key_type'>[],
    associations: Omit<z.infer<typeof AssociationKeySchema>, 'key_type'>[]
  })
}
