import type { ZodTypeAny, ZodUnion } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createUnionSchema: <T extends readonly [ZodTypeAny, ...ZodTypeAny[]]>(zodUnion: ZodUnion<T>, state: SchemaState) => Schema;
