import type { ZodIntersection, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createIntersectionSchema: <T extends ZodTypeAny, U extends ZodTypeAny>(zodIntersection: ZodIntersection<T, U>, state: SchemaState) => Schema;
