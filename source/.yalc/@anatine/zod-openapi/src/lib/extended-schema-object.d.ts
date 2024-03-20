import { SchemaObject } from 'openapi3-ts';
export type ResourceKey = {
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
export type ColumnKey = {
    column_source: string;
    column_type: string;
    display_name: string;
    name: string;
};
export type AssociationKey = {
    name: string;
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    visible: boolean;
};
export type ReferenceKey = {
    name: string;
    display_name: string;
    model_name: string;
    reference_type: string;
    foreign_key: string;
    primary_key: string;
};
export type ExtendSchemaObject = SchemaObject & Partial<ResourceKey> & Partial<ColumnKey> & Partial<AssociationKey> & Partial<ReferenceKey>;
