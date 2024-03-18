import type { ZodLazy, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createLazySchema: <T extends ZodTypeAny>(zodLazy: ZodLazy<T>, state: SchemaState) => Schema;
