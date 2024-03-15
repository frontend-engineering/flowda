import type { ZodDefault, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createDefaultSchema: <T extends ZodTypeAny>(zodDefault: ZodDefault<T>, state: SchemaState) => Schema;
