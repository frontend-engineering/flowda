import { ExtendSchemaObject } from '@anatine/zod-openapi'
import { AssociationKeySchema, ColumnUISchema, ReferenceKeySchema } from '@flowda/types'
import { z } from 'zod'
import * as _ from 'radash'

export class SchemaTransformer {
  private jsonschema?: ExtendSchemaObject
  private columns?: z.infer<typeof ColumnUISchema>[]
  private associations?: z.infer<typeof AssociationKeySchema>[]

  set(jsonschema: ExtendSchemaObject) {
    this.jsonschema = jsonschema
    const processed = processJsonschema(jsonschema)
    this.columns = processed.columns
    this.associations = processed.associations
    return this
  }

  toJSON() {
    if (!this.jsonschema) throw new Error(`No jsonschema set`)
    return {
      ..._.omit(this.jsonschema, ['properties', 'required']),
      ...{
        columns: this.columns,
        associations: this.associations,
      },
    }
  }
}

export function processJsonschema(jsonschema: ExtendSchemaObject) {
  if (!jsonschema.properties) throw new Error(`No properties of ${jsonschema.name}`)
  const props = jsonschema.properties

  const refCols = Object.keys(props).filter(k => {
    const prop = props[k] as ExtendSchemaObject
    return prop.model_name && prop.reference_type
  }).map(k => {
    const prop = props[k] as ExtendSchemaObject
    return ReferenceKeySchema.parse(prop)
  })

  return Object.keys(props).reduce((acc, cur) => {
    // 找不到强类型的更舒适的方法，直接 type cast
    const prop = props[cur] as ExtendSchemaObject

    // 然后判断 field 是否存在并 zod#parse
    if (prop.model_name /* 目前 association 和 reference 才有 model_name */) {
      if (prop.reference_type /* reference */) {
        // reference 忽略，在 foreign_key column 附着在 reference 上
        return acc
      }
      /* association */
      acc.associations.push(AssociationKeySchema.parse(prop))
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
    acc.columns.push(col)
    return acc
  }, {
    columns: [],
    associations: [],
  } as {
    columns: z.infer<typeof ColumnUISchema>[],
    associations: z.infer<typeof AssociationKeySchema>[]
  })
}
