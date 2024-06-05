import {
  ApiService,
  getResourceDataInputSchema,
  getResourceDataOutputSchema,
  getResourceInputSchema,
  putResourceDataInputSchema,
  ResourceUISchema,
} from '@flowda/types'
import { z } from 'zod'
import { trpc } from './trpc/trpc-client'
import { injectable } from 'inversify'

@injectable()
export class StoryApiService implements ApiService {
  postResourceData(input: { tenant: string; schemaName: string; value?: any }): Promise<unknown> {
    throw new Error('')
  }

  removeResourceData(input: { tenant: string; schemaName: string; id: string | number | null }): Promise<unknown> {
    throw new Error('')
  }

  getResourceSchema(input: z.infer<typeof getResourceInputSchema>): Promise<z.infer<typeof ResourceUISchema>> {
    return trpc.hello.getResourceSchema.query(input)
  }

  getResourceData(
    input: z.infer<typeof getResourceDataInputSchema>,
  ): Promise<z.infer<typeof getResourceDataOutputSchema>> {
    return trpc.hello.getResourceData.query(input)
  }

  putResourceData(input: z.infer<typeof putResourceDataInputSchema>): Promise<unknown> {
    return trpc.hello.putResourceData.mutate(input)
  }
}
