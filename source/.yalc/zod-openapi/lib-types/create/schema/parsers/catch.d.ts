import type { ZodCatch, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createCatchSchema: <T extends ZodTypeAny>(zodCatch: ZodCatch<T>, state: SchemaState) => Schema;
