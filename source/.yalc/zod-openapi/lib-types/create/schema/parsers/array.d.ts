import type { ArrayCardinality, ZodArray, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createArraySchema: <T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many">(zodArray: ZodArray<T, Cardinality>, state: SchemaState) => Schema;
