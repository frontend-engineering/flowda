import { z } from 'zod'
import {
  getResourceDataInputSchema,
  getResourceDataOutputSchema,
  getResourceInputSchema,
  postResourceDataInputSchema,
  putResourceDataInputSchema,
  removeResourceDataInputSchema,
} from '../schemas'
import { ResourceUISchema } from '../types'

export interface ApiService {
  getResourceSchema: (input: z.infer<typeof getResourceInputSchema>) => Promise<z.infer<typeof ResourceUISchema>>
  getResourceData: (
    input: z.infer<typeof getResourceDataInputSchema>,
  ) => Promise<z.infer<typeof getResourceDataOutputSchema>>
  putResourceData: (input: z.infer<typeof putResourceDataInputSchema>) => Promise<unknown>
  postResourceData: (input: z.infer<typeof postResourceDataInputSchema>) => Promise<unknown>
  removeResourceData: (input: z.infer<typeof removeResourceDataInputSchema>) => Promise<unknown>
}
