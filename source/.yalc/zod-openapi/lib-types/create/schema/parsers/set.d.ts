import type { ZodSet, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createSetSchema: <Value extends ZodTypeAny = ZodTypeAny>(zodSet: ZodSet<Value>, state: SchemaState) => Schema;
