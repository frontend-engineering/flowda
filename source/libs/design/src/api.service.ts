import {
    getResourceDataInputSchema,
    getResourceDataOutputSchema,
    getResourceInputSchema,
    putResourceDataInputSchema,
    ResourceUISchema,
} from '@flowda/types'
import { injectable } from 'inversify'
import { z } from 'zod'

@injectable()
export class ApiService {
    constructor() {

    }
    apis: Partial<{
        getResourceSchema: (input: z.infer<typeof getResourceInputSchema>) => Promise<z.infer<typeof ResourceUISchema>>
        getResourceData: (
            input: z.infer<typeof getResourceDataInputSchema>,
        ) => Promise<z.infer<typeof getResourceDataOutputSchema>>
        putResourceData: (input: z.infer<typeof putResourceDataInputSchema>) => Promise<unknown>
    }> = {}
}