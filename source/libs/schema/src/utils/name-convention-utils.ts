import * as plur from 'pluralize'
import * as _ from 'radash'
import { resourceKeySchema } from '@flowda/types'
import { z } from 'zod'

const NUM_REG = /^-?\d+(\.\d+)?$/

export function isLikeNumber(value: string) {
  return NUM_REG.test(value)
}

const PATH_REG = /(([a-z_]+s*)\/?([A-Za-z0-9-_:]+)?)+/g

function runPluralizeRules() {
  (['data', 'def', 'sms']).forEach((s) => {
    plur.addSingularRule(new RegExp(s, 'i'), s)
    plur.addPluralRule(new RegExp(s, 'i'), s)
  })
}

runPluralizeRules()

export const SCHEMA_SUFFIX = 'ResourceSchema'

export function toModelName(slug: string) {
  return _.capitalize(_.camel(plur.singular(slug))).replace(/ /g, '')
}

export function toPath(modelName: string) {
  return plur.plural(_.snake(modelName))
}

export function toSchemaName(slug: string) {
  const p = plur.singular(slug)
  return toModelName(p) + SCHEMA_SUFFIX
}

export function matchPath(path: string): z.infer<typeof resourceKeySchema>[] {
  const regRet = path.match(PATH_REG)
  if (regRet != null) {
    const ret = regRet.map(item => {
      const [resource, id] = item.split('/')

      const p = plur.singular(resource)
      return {
        resource: _.camel(p),
        resourceSchema: toSchemaName(resource),
        origin: resource,
        id: isLikeNumber(id) ? parseInt(id) : id,
      }
    })
    return ret
  } else {
    return []
  }
}
