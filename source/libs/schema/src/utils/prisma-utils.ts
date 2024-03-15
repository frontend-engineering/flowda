import { toModelName } from './name-convention-utils'
import { DMMFClass } from 'prisma/prisma-client/runtime'

export async function getResourceIdType(prisma: {
  _getDmmf: () => Promise<DMMFClass>
}, resource: string, id: string | number) {
  const modelName = toModelName(resource)
  const dmmf = await prisma._getDmmf()
  const idField = dmmf.modelMap[modelName].fields.find((item) => item.name === 'id')
  if (idField == null) {
    throw new Error(`No id field found`)
  }
  return idField.type === 'Int' && typeof id !== 'number' ? parseInt(id) : id
}
