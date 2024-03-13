import { z } from 'zod'
import { agSortSchema } from '@flowda/types'

export function convertSortAgToMotor(sort: z.infer<typeof agSortSchema>) {
  return sort[0] != null ? (sort[0].sort === 'asc' ? sort[0].colId : '-' + sort[0].colId) : undefined
}
