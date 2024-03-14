import type { ZodType, ZodTypeDef } from 'zod';
import type { Schema, SchemaState } from '../../schema';
export declare const createSchemaSwitch: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState) => Schema;
