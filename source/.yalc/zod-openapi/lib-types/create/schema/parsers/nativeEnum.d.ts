import type { EnumLike, ZodNativeEnum } from 'zod';
import type { Schema, SchemaState } from '../../schema';
export declare const createNativeEnumSchema: <T extends EnumLike>(zodEnum: ZodNativeEnum<T>, state: SchemaState) => Schema;
interface StringsAndNumbers {
    strings: string[];
    numbers: number[];
}
export declare const getValidEnumValues: (enumValues: EnumLike) => number[];
export declare const sortStringsAndNumbers: (values: Array<string | number>) => StringsAndNumbers;
export {};
