import { z } from "zod";
import { ZodTypeDef } from "zod/lib/types";
import { ExtendSchemaObject } from './extended-schema-object';
declare module 'zod' {
    interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
        openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<ExtendSchemaObject>): T;
    }
}
export declare function extendZodWithOpenApi(zod: typeof z, forceOverride?: boolean): void;
