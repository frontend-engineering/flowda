import type { oas31 } from './openapi3-ts/dist';
export declare const openApiVersions: readonly ["3.0.0", "3.0.1", "3.0.2", "3.0.3", "3.1.0"];
export type OpenApiVersion = (typeof openApiVersions)[number];
export declare const satisfiesVersion: (test: OpenApiVersion, against: OpenApiVersion) => boolean;
export declare const isReferenceObject: (schemaOrRef: oas31.SchemaObject | oas31.ReferenceObject) => schemaOrRef is oas31.ReferenceObject;
