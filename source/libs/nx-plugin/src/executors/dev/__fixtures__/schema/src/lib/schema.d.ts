import { z } from 'zod'
export declare const sampleSchema: z.ZodObject<
  {
    title: z.ZodString
    id: z.ZodNumber
  },
  'strip',
  z.ZodTypeAny,
  {
    title: string
    id: number
  },
  {
    title: string
    id: number
  }
>
