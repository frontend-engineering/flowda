import type { ZodNumber, ZodNumberCheck } from 'zod';
import type { oas30, oas31 } from '../../../openapi3-ts/dist';
import type { ZodOpenApiVersion } from '../../document';
import type { Schema, SchemaState } from '../../schema';
export declare const createNumberSchema: (zodNumber: ZodNumber, state: SchemaState) => Schema;
export declare const mapMaximum: (zodNumberCheck: ZodNumberCheckMap, openapi: ZodOpenApiVersion) => Pick<oas31.SchemaObject | oas30.SchemaObject, 'maximum' | 'exclusiveMaximum'> | undefined;
export declare const mapMinimum: (zodNumberCheck: ZodNumberCheckMap, openapi: ZodOpenApiVersion) => Pick<oas31.SchemaObject | oas30.SchemaObject, 'minimum' | 'exclusiveMinimum'> | undefined;
type ZodNumberCheckMap = {
    [kind in ZodNumberCheck['kind']]?: Extract<ZodNumberCheck, {
        kind: kind;
    }>;
};
export {};
