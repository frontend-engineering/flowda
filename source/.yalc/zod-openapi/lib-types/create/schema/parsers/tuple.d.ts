import type { ZodTuple, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createTupleSchema: <T extends [] | [ZodTypeAny, ...ZodTypeAny[]] = [ZodTypeAny, ...ZodTypeAny[]], Rest extends ZodTypeAny | null = null>(zodTuple: ZodTuple<T, Rest>, state: SchemaState) => Schema;
