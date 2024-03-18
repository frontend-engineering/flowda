import type { ZodPipeline, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createPipelineSchema: <A extends ZodTypeAny, B extends ZodTypeAny>(zodPipeline: ZodPipeline<A, B>, state: SchemaState) => Schema;
