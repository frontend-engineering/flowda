import type { ZodEnum } from 'zod';
import type { Schema } from '..';
export declare const createEnumSchema: <T extends [string, ...string[]]>(zodEnum: ZodEnum<T>) => Schema;
