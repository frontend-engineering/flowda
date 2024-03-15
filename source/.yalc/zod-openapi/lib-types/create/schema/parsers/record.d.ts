import type { KeySchema, ZodRecord, ZodString, ZodTypeAny } from 'zod';
import { type Schema, type SchemaState } from '../../schema';
export declare const createRecordSchema: <Key extends KeySchema = ZodString, Value extends ZodTypeAny = ZodTypeAny>(zodRecord: ZodRecord<Key, Value>, state: SchemaState) => Schema;
