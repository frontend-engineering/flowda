import { SchemaObject } from 'openapi3-ts';
import { ZodTypeAny } from 'zod';

type OpenApiZodAny = ZodTypeAny;
declare function extendApi<T extends OpenApiZodAny>(schema: T, SchemaObject?: SchemaObject): T;
declare function generateSchema(zodRef: OpenApiZodAny, useOutput?: boolean): SchemaObject;

export { type OpenApiZodAny, extendApi, generateSchema };
