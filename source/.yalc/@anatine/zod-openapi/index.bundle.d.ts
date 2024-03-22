import { z, ZodTypeAny } from 'zod';
import { SchemaObject } from 'openapi3-ts';
import { ZodTypeDef } from 'zod/lib/types';

declare module 'zod' {
    interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
        openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<SchemaObject>): T;
    }
}
declare function extendZodWithOpenApi(zod: typeof z, forceOverride?: boolean): void;

interface OpenApiZodAny extends ZodTypeAny {
    metaOpenApi?: SchemaObject | SchemaObject[];
}
declare function extendApi<T extends OpenApiZodAny>(schema: T, SchemaObject?: SchemaObject): T;
declare function generateSchema(zodRef: OpenApiZodAny, useOutput?: boolean): SchemaObject;

export { type OpenApiZodAny, extendApi, extendZodWithOpenApi, generateSchema };
