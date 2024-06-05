import { ReferenceKeySchema, agFilterSchema } from '@flowda/types'
import { z } from 'zod'
// https://github.com/iamkun/dayjs/issues/475#issuecomment-460660048
import dayjs from 'dayjs'
import { getUriFilterModel } from '../uri/uri-utils'
import { pickBy } from 'lodash'

export function getReferenceDisplay(refCol: z.infer<typeof ReferenceKeySchema>, val: any) {
  return `${refCol.reference_type} ${refCol.display_name}#${val[refCol.primary_key]}`
}

export function shortenDatetime(text: string) {
  if (!dayjs(text).isValid()) return text

  let shortFormat
  if (dayjs(text).isSame(dayjs(), 'year')) {
    shortFormat = 'MM-DD HH:mm'
  } else {
    shortFormat = 'YY-MM-DD HH:mm'
  }
  return dayjs(text).format(shortFormat)
}

export function smartMergeFilterModel(
  uri: string,
  filterModel: z.infer<typeof agFilterSchema>,
  isFirstGetRows: boolean,
) {
  const uriFilterModel = getUriFilterModel(uri)
  // 首次和 onCurrentEditorChanged 直接用 uri
  if (isFirstGetRows) return uriFilterModel
  // 其他情况下 params.filterModel 合并

  const picked = pickBy(uriFilterModel, (value, key) => key in filterModel)

  return {
    ...picked,
    ...filterModel,
  }
}
