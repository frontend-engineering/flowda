import type { ZodEffects, ZodTypeAny, input, output } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createRefineSchema: <T extends ZodTypeAny, Output = output<T>, Input = input<T>>(zodRefine: ZodEffects<T, Output, Input>, state: SchemaState) => Schema;
