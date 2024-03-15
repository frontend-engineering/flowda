import type { ZodBranded, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createBrandedSchema: <T extends ZodTypeAny, B extends string | number | symbol>(zodBranded: ZodBranded<T, B>, state: SchemaState) => Schema;
