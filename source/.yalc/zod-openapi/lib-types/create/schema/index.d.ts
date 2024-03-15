import type { ZodType, ZodTypeDef } from 'zod';
import type { oas31 } from '../../openapi3-ts/dist';
import { type ComponentsObject, type CreationType, type Effect, type SchemaComponent } from '../components';
export type LazyMap = Map<ZodType, true>;
export interface SchemaState {
    components: ComponentsObject;
    type: CreationType;
    path: string[];
    visited: Set<ZodType>;
}
export declare const createNewSchema: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState) => Schema;
export declare const createNewRef: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(ref: string, zodSchema: ZodType<Output, Def, Input>, state: SchemaState) => Schema;
export declare const createExistingRef: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, component: SchemaComponent | undefined, state: SchemaState) => Schema | undefined;
export type BaseObject = {
    effects?: Effect[];
};
export type RefObject = BaseObject & {
    type: 'ref';
    schema: oas31.ReferenceObject;
    zodType: ZodType;
};
export type SchemaObject = BaseObject & {
    type: 'schema';
    schema: oas31.SchemaObject;
};
export type Schema = SchemaObject | RefObject;
export declare const createSchemaOrRef: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState) => Schema;
export declare const createSchemaObject: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => Schema;
export declare const createSchema: <Output = unknown, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(zodSchema: ZodType<Output, Def, Input>, state: SchemaState, subpath: string[]) => oas31.SchemaObject | oas31.ReferenceObject;
