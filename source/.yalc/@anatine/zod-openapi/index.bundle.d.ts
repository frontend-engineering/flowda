import { SchemaObject } from 'openapi3-ts';
import { z, ZodTypeAny } from 'zod';
import { ZodTypeDef } from 'zod/lib/types';

type ResourceKey = {
    key_type: 'resource';
    class_name: string;
    display_column: string;
    display_name: string;
    display_primary_key: boolean;
    name: string;
    primary_key: string | null;
    searchable_columns: string[] | null;
    slug: string;
    table_name: string;
    visible: boolean;
};
type ColumnKey = {
    key_type: 'column';
    column_source: string;
    column_type: string;
    display_name: string;
    name: string;
};
type AssociationKey = {
    key_type: 'association';
    name: string;
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    visible: boolean;
};
type ReferenceKey = {
    key_type: 'reference';
    name: string;
    display_name: string;
    model_name: string;
    reference_type: 'belongs_to' | 'has_one';
    foreign_key: string;
    primary_key: string;
};
type ExtendSchemaObject = SchemaObject & (ResourceKey | ColumnKey | AssociationKey | ReferenceKey);

declare module 'zod' {
    interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
        openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<ExtendSchemaObject>): T;
    }
}
declare function extendZodWithOpenApi(zod: typeof z, forceOverride?: boolean): void;

interface OpenApiZodAny extends ZodTypeAny {
    metaOpenApi?: SchemaObject | SchemaObject[];
}
declare function extendApi<T extends OpenApiZodAny>(schema: T, SchemaObject?: SchemaObject): T;
declare function generateSchema(zodRef: OpenApiZodAny, useOutput?: boolean): SchemaObject;
declare function zodToOpenAPI(zodRef: OpenApiZodAny, useOutput?: boolean): ExtendSchemaObject;

export { type AssociationKey, type ColumnKey, type ExtendSchemaObject, type OpenApiZodAny, type ReferenceKey, type ResourceKey, extendApi, extendZodWithOpenApi, generateSchema, zodToOpenAPI };
