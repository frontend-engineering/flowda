import { SchemaObject } from 'openapi3-ts';
export type ResourceKey = {
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
export type ColumnKey = {
    key_type: 'column';
    column_source: string;
    column_type: string;
    display_name: string;
    name: string;
};
export type AssociationKey = {
    key_type: 'association';
    name: string;
    display_name: string;
    slug: string;
    model_name: string;
    foreign_key: string;
    primary_key: string;
    visible: boolean;
};
export type ReferenceKey = {
    key_type: 'reference';
    name: string;
    display_name: string;
    model_name: string;
    reference_type: 'belongs_to' | 'has_one';
    foreign_key: string;
    primary_key: string;
};
export type ExtendSchemaObject = SchemaObject & (ResourceKey | ColumnKey | AssociationKey | ReferenceKey);
