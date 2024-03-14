import type { oas31 } from '../../openapi3-ts/dist';
import type { Schema } from '.';
export declare const enhanceWithMetadata: (schema: Schema, metadata: oas31.SchemaObject | oas31.ReferenceObject) => Schema;
