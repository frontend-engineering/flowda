import type { UnknownKeysParam, ZodObject, ZodRawShape, ZodType, ZodTypeAny, objectInputType, objectOutputType } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type Effect } from '../../components';
import { type Schema, type SchemaState } from '../../schema';
export declare const createObjectSchema: <T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall, UnknownKeys>, Input = objectInputType<T, Catchall, UnknownKeys>>(zodObject: ZodObject<T, UnknownKeys, Catchall, Output, Input>, state: SchemaState) => Schema;
export declare const createExtendedSchema: <T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall, UnknownKeys>, Input = objectInputType<T, Catchall, UnknownKeys>>(zodObject: ZodObject<T, UnknownKeys, Catchall, Output, Input>, baseZodObject: ZodObject<T, UnknownKeys, Catchall, Output, Input> | undefined, state: SchemaState) => Schema | undefined;
interface AdditionalPropertyOptions {
    unknownKeys?: UnknownKeysParam;
    catchAll: ZodType;
}
export declare const createObjectSchemaFromShape: (shape: ZodRawShape, { unknownKeys, catchAll }: AdditionalPropertyOptions, state: SchemaState) => Schema;
export declare const mapRequired: (shape: ZodRawShape, state: SchemaState) => {
    required: string[];
    effects?: Effect[] | undefined;
} | undefined;
interface PropertyMap {
    properties: NonNullable<oas31.SchemaObject['properties']>;
    effects: Array<Effect[] | undefined>;
}
export declare const mapProperties: (shape: ZodRawShape, state: SchemaState) => PropertyMap | undefined;
export {};
