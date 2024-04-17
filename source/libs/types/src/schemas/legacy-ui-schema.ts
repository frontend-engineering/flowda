import { z } from 'zod'

// todo: 后续开源相关服务后再同步调整
export const selectOptionSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string(),
})

export const resourceKeySchema = z.object({
  origin: z.string(),
  resource: z.string(),
  resourceSchema: z.string(),
  id: z.union([z.string(), z.number()]).optional(),
})

export const getDataSchema = z.object({
  user: z.any(),
  path: z.string(),
  query: z.any(),
})

export const putDataSchema = z.object({
  user: z.any(),
  path: z.string(),
  values: z.any(),
})
