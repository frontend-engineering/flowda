import type { ZodNullable, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createNullableSchema: <T extends ZodTypeAny>(zodNullable: ZodNullable<T>, state: SchemaState) => Schema;
