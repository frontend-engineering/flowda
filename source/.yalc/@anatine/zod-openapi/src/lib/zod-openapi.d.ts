import type { SchemaObject } from 'openapi3-ts';
import { ZodTypeAny } from 'zod';
import { ExtendSchemaObject } from './extended-schema-object';
export interface OpenApiZodAny extends ZodTypeAny {
    metaOpenApi?: SchemaObject | SchemaObject[];
}
export declare function extendApi<T extends OpenApiZodAny>(schema: T, SchemaObject?: SchemaObject): T;
export declare function generateSchema(zodRef: OpenApiZodAny, useOutput?: boolean): SchemaObject;
export declare function zodToOpenAPI(zodRef: OpenApiZodAny, useOutput?: boolean): ExtendSchemaObject;
