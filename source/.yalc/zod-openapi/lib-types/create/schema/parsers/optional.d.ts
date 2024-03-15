import type { ZodOptional, ZodTypeAny } from 'zod';
import type { Effect } from '../../components';
import { type Schema, type SchemaState } from '../../schema';
export declare const createOptionalSchema: <T extends ZodTypeAny>(zodOptional: ZodOptional<T>, state: SchemaState) => Schema;
type OptionalResult = {
    optional: boolean;
    effects?: Effect[];
};
export declare const isOptionalSchema: (zodSchema: ZodTypeAny, state: SchemaState) => OptionalResult;
export {};
