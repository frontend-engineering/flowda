import type { ZodAny, ZodUnknown } from 'zod';
import type { Schema } from '..';
export declare const createUnknownSchema: (_zodUnknown: ZodUnknown | ZodAny) => Schema;
