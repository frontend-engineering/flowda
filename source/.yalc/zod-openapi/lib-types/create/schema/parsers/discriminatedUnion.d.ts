import type { AnyZodObject, ZodDiscriminatedUnion, ZodDiscriminatedUnionOption } from 'zod';
import type { oas31 } from '../../../openapi3-ts/dist';
import { type Schema, type SchemaState } from '../../schema';
export declare const createDiscriminatedUnionSchema: <Discriminator extends string, Options extends ZodDiscriminatedUnionOption<Discriminator>[]>(zodDiscriminatedUnion: ZodDiscriminatedUnion<Discriminator, Options>, state: SchemaState) => Schema;
export declare const mapDiscriminator: (schemas: Array<oas31.SchemaObject | oas31.ReferenceObject>, zodObjects: AnyZodObject[], discriminator: unknown, state: SchemaState) => oas31.SchemaObject['discriminator'];
