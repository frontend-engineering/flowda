import type { ZodReadonly, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createReadonlySchema: <T extends ZodTypeAny>(zodReadonly: ZodReadonly<T>, state: SchemaState) => Schema;
