import { SchemaObject } from 'openapi3-ts';
import { ZodTypeAny, z } from 'zod';
import { ZodTypeDef } from 'zod/lib/types';

interface OpenApiZodAny extends ZodTypeAny {
    metaOpenApi?: SchemaObject | SchemaObject[];
}
declare function extendApi<T extends OpenApiZodAny>(schema: T, SchemaObject?: SchemaObject): T;
declare function generateSchema(zodRef: OpenApiZodAny, useOutput?: boolean): SchemaObject;

type ResourceKey = {
    class_name: string;
    display_column: string;
    display_name: string;
    display_primary_key: boolean;
    name: string;
    primary_key: string;
    searchable_columns: string[] | null;
    slug: string;
    table_name: string;
    visible: boolean;
};
type ColumnKey = {
    column_source: string;
    column_type: string;
    display_name: string;
    name: string;
};
type AssociationKey = {
    name: string;
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    visible: boolean;
};
type ReferenceKey = {
    name: string;
    display_name: string;
    model_name: string;
    reference_type: string;
    foreign_key: string;
    primary_key: string;
};
type ExtendSchemaObject = SchemaObject & Partial<ResourceKey> & Partial<ColumnKey> & Partial<AssociationKey> & Partial<ReferenceKey>;

declare module 'zod' {
    interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
        openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<ExtendSchemaObject>): T;
    }
}
declare function extendZodWithOpenApi(zod: typeof z, forceOverride?: boolean): void;

export { type AssociationKey, type ColumnKey, type ExtendSchemaObject, type OpenApiZodAny, type ReferenceKey, type ResourceKey, extendApi, extendZodWithOpenApi, generateSchema };
