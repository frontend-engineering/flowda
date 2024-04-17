/// <reference types="node" />
import * as fs from 'fs';
import * as _prisma_generator_helper from '@prisma/generator-helper';
import { DMMF, GeneratorOptions } from '@prisma/generator-helper';
import { z } from 'zod';
import { Spec } from 'comment-parser';
import CodeBlockWriter, { Options } from 'code-block-writer';
import * as lodash from 'lodash';

type CreateDirOptions = fs.MakeDirectoryOptions & {
    recursive: true;
};
declare class DirectoryHelper {
    static pathExistsElseCreate(path: string): boolean;
    static createDir(path: string, options?: CreateDirOptions): string | undefined;
    static pathOrDirExists(path: string): boolean;
    static removeDir(path?: string | null): void;
}

declare const configSchema: z.ZodObject<{
    useMultipleFiles: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createInputTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createModelTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createOptionalDefaultValuesTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createRelationValuesTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    createPartialTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    addInputTypeValidation: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    addIncludeType: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    addSelectType: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    validateWhereUniqueInput: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    useDefaultValidators: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    coerceDate: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    writeNullishInModelTypes: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    prismaClientPath: z.ZodDefault<z.ZodString>;
    provider: z.ZodOptional<z.ZodString>;
    isMongoDb: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, boolean, string | undefined>;
    inputTypePath: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    outputTypePath: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    extendZod: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    defaultInvisibleField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, string[], string | undefined>;
    defaultReadOnlyField: z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, string[], string | undefined>;
}, "strip", z.ZodTypeAny, {
    useMultipleFiles: boolean;
    createInputTypes: boolean;
    createModelTypes: boolean;
    createOptionalDefaultValuesTypes: boolean;
    createRelationValuesTypes: boolean;
    createPartialTypes: boolean;
    addInputTypeValidation: boolean;
    addIncludeType: boolean;
    addSelectType: boolean;
    validateWhereUniqueInput: boolean;
    useDefaultValidators: boolean;
    coerceDate: boolean;
    writeNullishInModelTypes: boolean;
    prismaClientPath: string;
    isMongoDb: boolean;
    inputTypePath: string;
    outputTypePath: string;
    extendZod: string;
    defaultInvisibleField: string[];
    defaultReadOnlyField: string[];
    provider?: string | undefined;
}, {
    useMultipleFiles?: string | undefined;
    createInputTypes?: string | undefined;
    createModelTypes?: string | undefined;
    createOptionalDefaultValuesTypes?: string | undefined;
    createRelationValuesTypes?: string | undefined;
    createPartialTypes?: string | undefined;
    addInputTypeValidation?: string | undefined;
    addIncludeType?: string | undefined;
    addSelectType?: string | undefined;
    validateWhereUniqueInput?: string | undefined;
    useDefaultValidators?: string | undefined;
    coerceDate?: string | undefined;
    writeNullishInModelTypes?: string | undefined;
    prismaClientPath?: string | undefined;
    provider?: string | undefined;
    isMongoDb?: string | undefined;
    inputTypePath?: string | undefined;
    outputTypePath?: string | undefined;
    extendZod?: string | undefined;
    defaultInvisibleField?: string | undefined;
    defaultReadOnlyField?: string | undefined;
}>;
type GeneratorConfig = z.infer<typeof configSchema>;

interface StringVariants {
    original: string;
    camelCase: string;
    pascalCase: string;
    upperCaseLodash: string;
    upperCaseSpace: string;
}
declare function getStringVariants(string: string): StringVariants;

declare class FormattedNames {
    readonly formattedNames: StringVariants;
    constructor(string: string);
    getStringVariants: typeof getStringVariants;
}

declare class ExtendedDMMFEnum extends FormattedNames {
    readonly generatorConfig: GeneratorConfig;
    readonly name: string;
    readonly values: DMMF.EnumValue[];
    readonly dbName?: string | null;
    readonly documentation?: string;
    readonly openapi?: Spec[];
    constructor(generatorConfig: GeneratorConfig, enums: DMMF.DatamodelEnum);
}

interface CreateOptions {
    dmmf: ExtendedDMMF;
    path: string;
}
type CreateFiles = (options: CreateOptions) => void;
type ZodPrimitiveType = 'string' | 'number' | 'bigint' | 'boolean' | 'date' | 'symbol' | 'undefined' | 'null' | 'void' | 'unknown' | 'never' | 'any';
type ZodScalarType = Extract<ZodPrimitiveType, 'string' | 'number' | 'date' | 'boolean' | 'bigint' | 'unknown' | 'any'>;
type PrismaAction = 'findUnique' | 'findMany' | 'findFirst' | 'createOne' | 'createMany' | 'updateOne' | 'updateMany' | 'upsertOne' | 'deleteOne' | 'deleteMany' | 'executeRaw' | 'aggregate' | 'count' | 'groupBy';
interface ContentWriterOptions {
    fileWriter: CreateFileOptions;
    dmmf: ExtendedDMMF;
    getSingleFileContent?: boolean;
}

type OmitFieldMode = 'model' | 'input' | 'all' | 'none';

interface ExtendedDMMFField extends DMMF.Field, FormattedNames {
    readonly generatorConfig: GeneratorConfig;
    readonly isNullable: boolean;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    readonly isOptionalOnDefaultValue: boolean;
    readonly isOptionalDefaultField: boolean;
    readonly clearedDocumentation?: string;
    readonly zodValidatorString?: string;
    readonly openapi?: Spec[];
    readonly zodCustomErrors?: string;
    readonly zodCustomValidatorString?: string;
    readonly zodArrayValidatorString?: string;
    readonly zodOmitField: OmitFieldMode;
    readonly zodType: string;
    readonly relatedField?: DMMF.Field;
    omitInModel(): boolean;
    omitInInputTypes(inputTypeName: string): boolean;
    isOmitField(): boolean;
}

declare class ExtendedDMMFModel extends FormattedNames implements DMMF.Model {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.Model['name'];
    readonly dbName: DMMF.Model['dbName'];
    readonly fields: ExtendedDMMFField[];
    readonly uniqueFields: DMMF.Model['uniqueFields'];
    readonly uniqueIndexes: DMMF.Model['uniqueIndexes'];
    readonly documentation?: DMMF.Model['documentation'];
    readonly primaryKey: DMMF.Model['primaryKey'];
    readonly scalarFields: ExtendedDMMFField[];
    readonly relationFields: ExtendedDMMFField[];
    readonly filterdRelationFields: ExtendedDMMFField[];
    readonly enumFields: ExtendedDMMFField[];
    readonly hasRelationFields: boolean;
    readonly hasRequiredJsonFields: boolean;
    readonly hasOptionalJsonFields: boolean;
    readonly hasOmitFields: boolean;
    readonly hasDecimalFields: boolean;
    readonly hasOptionalDefaultFields: boolean;
    readonly imports: Set<string>;
    readonly customImports: Set<string>;
    readonly errorLocation: string;
    readonly clearedDocumentation?: string;
    readonly openapi?: Spec[];
    readonly optionalJsonFields: ExtendedDMMFField[];
    readonly optionalJsonFieldUnion: string;
    readonly writeOptionalDefaultValuesTypes: boolean;
    readonly writeRelationValueTypes: boolean;
    readonly writeOptionalDefaultsRelationValueTypes: boolean;
    readonly writePartialTypes: boolean;
    readonly writePartialRelationValueTypes: boolean;
    constructor(generatorConfig: GeneratorConfig, model: DMMF.Model, models?: DMMF.Model[]);
    private _setErrorLocation;
    private _getExtendedFields;
    private _setScalarFields;
    private _setRelationFields;
    private _setFilteredRelationFields;
    private _setHasRequiredJsonFields;
    private _setHasOptionalJsonFields;
    private _setEnumfields;
    private _setHasRelationFields;
    private _setHasOmitFields;
    private _setWriteOptionalDefaultValuesTypes;
    private _setWritePartialTypes;
    private _setWriteRelationValueTypes;
    private _setWriteOptionalDefaultsRelationValueTypes;
    private _writePartialRelationValueTypes;
    private _setHasOptionalDefaultFields;
    private _setHasDecimalFields;
    private _setOptionalJsonFields;
    private _setOptionalJsonFieldUnion;
    private _getDocumentationContent;
    private _extractZodDirectives;
    private _getAutomaticImports;
}

declare class ExtendedDMMFDatamodel {
    readonly generatorConfig: GeneratorConfig;
    readonly enums: ExtendedDMMFEnum[];
    readonly models: ExtendedDMMFModel[];
    readonly types: ExtendedDMMFModel[];
    constructor(generatorConfig: GeneratorConfig, datamodel: DMMF.Datamodel);
    private _getExtendedModels;
    private _getExtendedEnums;
}

declare class ExtendedDMMFSchema implements DMMF.Schema {
    readonly generatorConfig: GeneratorConfig;
    readonly rootQueryType?: DMMF.Schema['rootQueryType'];
    readonly rootMutationType?: DMMF.Schema['rootMutationType'];
    readonly inputObjectTypes: {
        readonly model?: DMMF.InputType[];
        readonly prisma: ExtendedDMMFInputType[];
    };
    readonly outputObjectTypes: {
        readonly model: ExtendedDMMFOutputType[];
        readonly prisma: ExtendedDMMFOutputType[];
        readonly aggregateAndCountTypes: ExtendedDMMFOutputType[];
        readonly argTypes: ExtendedDMMFOutputType[];
    };
    readonly enumTypes: {
        readonly model?: DMMF.SchemaEnum[];
        readonly prisma: ExtendedDMMFSchemaEnum[];
    };
    readonly fieldRefTypes: {
        readonly prisma?: DMMF.FieldRefType[];
    };
    readonly hasJsonTypes: boolean;
    readonly hasBytesTypes: boolean;
    readonly hasDecimalTypes: boolean;
    constructor(generatorConfig: GeneratorConfig, schema: DMMF.Schema, datamodel: ExtendedDMMFDatamodel);
    private _setExtendedInputObjectTypes;
    private _setExtendedOutputObjectTypes;
    private _setExtendedEnumTypes;
    private _setHasJsonTypes;
    private _setHasBytesTypes;
    private _setHasDecimalTypes;
    getModelWithIncludeAndSelect(field: ExtendedDMMFSchemaField): ExtendedDMMFOutputType | undefined;
}

declare class ExtendedDMMF implements DMMF.Document {
    readonly generatorConfig: GeneratorConfig;
    readonly datamodel: ExtendedDMMFDatamodel;
    readonly schema: ExtendedDMMFSchema;
    readonly mappings: DMMF.Mappings;
    readonly imports: Set<string>;
    readonly customImports: Set<string>;
    constructor(dmmf: DMMF.Document, config: GeneratorConfig);
    private _getExtendedDatamodel;
    private _getExtendedSchema;
    private _getImports;
    private _getCustomImports;
    private _getExtendedMappings;
    private _setGeneratorConfig;
}

interface ExtendedDMMFSchemaArgOptions extends DMMF.SchemaArg, ZodValidatorOptions {
}
interface ZodValidatorOptions {
    zodValidatorString?: string;
    zodCustomErrors?: string;
    zodCustomValidatorString?: string;
    zodOmitField?: boolean;
}
declare class ExtendedDMMFSchemaArg extends FormattedNames implements DMMF.SchemaArg {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.SchemaArg['name'];
    readonly comment?: DMMF.SchemaArg['comment'];
    readonly isNullable: DMMF.SchemaArg['isNullable'];
    readonly isRequired: DMMF.SchemaArg['isRequired'];
    readonly inputTypes: ExtendedDMMFSchemaArgInputType[];
    readonly deprecation?: DMMF.SchemaArg['deprecation'];
    readonly zodValidatorString?: string;
    readonly zodCustomErrors?: string;
    readonly zodCustomValidatorString?: string;
    readonly zodOmitField?: boolean;
    readonly hasSingleType: boolean;
    readonly hasMultipleTypes: boolean;
    readonly isOptional: boolean;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    readonly linkedField?: ExtendedDMMFField;
    constructor(generatorConfig: GeneratorConfig, arg: ExtendedDMMFSchemaArgOptions, linkedField?: ExtendedDMMFField);
    private _setInputTypes;
    private _setHasSingleType;
    private _setHasMultipleTypes;
    private _setIsOptional;
    private _setIsJsonType;
    private _setIsBytesType;
    private _setIsDecimalType;
    rewriteArgWithNewType(): boolean;
    getImports(fieldName: string): string[];
}

declare class ExtendedDMMFInputType extends FormattedNames implements DMMF.InputType {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.InputType['name'];
    readonly constraints: DMMF.InputType['constraints'];
    readonly meta: DMMF.InputType['meta'];
    readonly fields: ExtendedDMMFSchemaArg[];
    readonly fieldMap: DMMF.InputType['fieldMap'];
    readonly linkedModel?: ExtendedDMMFModel;
    readonly isJsonField: boolean;
    readonly isBytesField: boolean;
    readonly isDecimalField: boolean;
    readonly omitFields: string[];
    readonly imports: Set<string>;
    readonly isWhereUniqueInput?: boolean;
    readonly extendedWhereUniqueFields?: ExtendedDMMFSchemaArg[][];
    constructor(generatorConfig: GeneratorConfig, type: DMMF.InputType, datamodel: ExtendedDMMFDatamodel);
    private _setLinkedModel;
    private _setFields;
    private _fieldIsPrismaFunctionType;
    private _getZodValidatorString;
    private _getZodCustomErrorsString;
    private _getZodCustomValidatorString;
    private _getZodOmitField;
    private _setIsJsonField;
    private _setIsBytesField;
    private _setIsDecimalField;
    private _setOmitFields;
    private _setImports;
    private _getExtendedWhereUniqueFieldCombinations;
    private _setExtendedWhereUniqueFields;
    hasOmitFields(): boolean;
    getOmitFieldsUnion(): string;
}

type FilterdPrismaAction = Exclude<PrismaAction, 'executeRaw' | 'queryRaw' | 'count'>;

declare class ExtendedDMMFSchemaField extends FormattedNames implements DMMF.SchemaField {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.SchemaField['name'];
    readonly isNullable: DMMF.SchemaField['isNullable'];
    readonly outputType: DMMF.SchemaField['outputType'];
    readonly args: ExtendedDMMFSchemaArg[];
    readonly deprecation?: DMMF.SchemaField['deprecation'];
    readonly documentation?: DMMF.SchemaField['documentation'];
    readonly prismaAction: FilterdPrismaAction;
    readonly argName?: string;
    readonly modelType: string | DMMF.OutputType | DMMF.SchemaEnum;
    readonly linkedModel?: ExtendedDMMFModel;
    readonly hasOmitFields: boolean;
    readonly argTypeImports: Set<string>;
    readonly writeSelectFindManyField: boolean;
    readonly writeSelectField: boolean;
    readonly writeIncludeFindManyField: boolean;
    readonly writeIncludeField: boolean;
    readonly writeSelectAndIncludeArgs: boolean;
    readonly customArgType: string;
    readonly writeSelectArg: boolean;
    readonly writeIncludeArg: boolean;
    constructor(generatorConfig: GeneratorConfig, field: DMMF.SchemaField, datamodel: ExtendedDMMFDatamodel);
    testOutputType(): boolean;
    private _setArgs;
    private _setMatchedPrismaAction;
    private _setModelType;
    private _setArgName;
    private _setLinkedModel;
    private _setHasOmitFields;
    private _setArgTypeImports;
    private _setWriteSelectFindManyField;
    private _setWriteSelectField;
    private _setWriteIncludeFindManyField;
    private _setWriteIncludeField;
    private _setWriteSelectAndIncludeArgs;
    private _setWriteSelectArg;
    private _setWriteIncludeArg;
    private _shouldAddOmittedFieldsToOmitUnionArray;
    private _shouldAddIncludeOrSelectToOmitUnion;
    private _shouldAddIncludeToOmitUnionArray;
    private _shouldAddSelectToOmitUnionArray;
    private _getOmitFieldsUnion;
    private _addOmittedFieldsToOmitUnionArray;
    private _setCustomArgType;
    private _getTypeForCustomArgsType;
    private _getCustomArgsFieldName;
    private _getCustomArgsType;
    private _getCustomArgsMultipleTypes;
    private _getCustomArgsSingleType;
    isEnumOutputType(): boolean;
    isListOutputType(): boolean;
    isObjectOutputType(): boolean;
    isScalarOutputType(): boolean;
    isCountField(): boolean;
}

declare class ExtendedDMMFOutputType extends FormattedNames implements DMMF.OutputType {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.OutputType['name'];
    readonly fields: ExtendedDMMFSchemaField[];
    readonly fieldMap?: DMMF.OutputType['fieldMap'];
    readonly prismaActionFields: ExtendedDMMFSchemaField[];
    readonly prismaOtherFields: ExtendedDMMFSchemaField[];
    readonly linkedModel?: ExtendedDMMFModel;
    readonly selectImports: Set<string>;
    readonly includeImports: Set<string>;
    constructor(generatorConfig: GeneratorConfig, type: DMMF.OutputType, datamodel: ExtendedDMMFDatamodel);
    private _setLinkedModel;
    private _setFields;
    private _setSelectImports;
    private _setIncludeImports;
    hasCountField(): boolean;
    hasRelationField(): boolean;
    writeMongoDbInclude(): boolean;
    writeInclude(): boolean;
    writeIncludeArgs(): boolean;
    writeCountArgs(): boolean;
}

declare class ExtendedDMMFSchemaArgInputType implements DMMF.SchemaArgInputType {
    readonly generatorConfig: GeneratorConfig;
    readonly isJsonType: boolean;
    readonly isBytesType: boolean;
    readonly isDecimalType: boolean;
    readonly isNullType: boolean;
    readonly isList: DMMF.SchemaArgInputType['isList'];
    readonly type: DMMF.SchemaArgInputType['type'];
    readonly location: DMMF.SchemaArgInputType['location'];
    readonly namespace?: DMMF.SchemaArgInputType['namespace'];
    constructor(generatorConfig: GeneratorConfig, arg: DMMF.SchemaArgInputType);
    private _setIsJsonType;
    private _setIsBytesType;
    private _setIsDecimalType;
    private _setIsNullType;
    getZodScalarType: () => ZodScalarType | undefined;
    getZodNonScalarType: () => DMMF.ArgType | undefined;
    getZodNullType: () => "null" | undefined;
    isStringType: (type?: DMMF.ArgType) => type is string;
    isSchemaEnum: (type?: DMMF.ArgType) => type is DMMF.SchemaEnum;
    isInputType: (type?: DMMF.ArgType) => type is DMMF.InputType;
    isSpecialType: () => boolean;
}

declare class ExtendedDMMFSchemaEnum extends FormattedNames implements DMMF.SchemaEnum {
    readonly generatorConfig: GeneratorConfig;
    readonly name: DMMF.SchemaEnum['name'];
    readonly values: DMMF.SchemaEnum['values'];
    readonly useNativeEnum: boolean;
    constructor(generatorConfig: GeneratorConfig, enumType: DMMF.SchemaEnum);
    private _setUseNativeEnum;
}

interface FileWriterOptions {
    writerOptions?: Options;
}
interface CreateFileOptions {
    writer: CodeBlockWriter;
    writeImport: (importName: string, importPath: string) => void;
    writeImportSet: (strings: Set<string>) => void;
    writeExport: (importName: string, importPath: string) => void;
    writeImports: (imports: string[]) => void;
    writeHeading: (headline: string, type?: 'SLIM' | 'FAT') => void;
    writeJSDoc: (documentation?: string) => void;
}
declare class FileWriter {
    readonly writer: CodeBlockWriter;
    constructor(options?: FileWriterOptions);
    createPath(path: string): string | undefined;
    createFile(path: string, writerFn: (options: CreateFileOptions) => void): void;
    writeImport(importName: string, importPath: string): void;
    writeImportSet(strings: Set<string>): void;
    writeHeading(heading: string, type?: 'SLIM' | 'FAT'): CodeBlockWriter;
    writeJSDoc(doc?: string): void;
    writeExport(exportName: string, exportPath: string): void;
    writeImports(imports?: string[]): void;
}

declare const loadDMMF: (schemaPath: string) => Promise<_prisma_generator_helper.DMMF.Document>;

declare const parseGeneratorConfig: (generatorOptions: GeneratorOptions) => {
    useMultipleFiles: boolean;
    createInputTypes: boolean;
    createModelTypes: boolean;
    createOptionalDefaultValuesTypes: boolean;
    createRelationValuesTypes: boolean;
    createPartialTypes: boolean;
    addInputTypeValidation: boolean;
    addIncludeType: boolean;
    addSelectType: boolean;
    validateWhereUniqueInput: boolean;
    useDefaultValidators: boolean;
    coerceDate: boolean;
    writeNullishInModelTypes: boolean;
    prismaClientPath: string;
    isMongoDb: boolean;
    inputTypePath: string;
    outputTypePath: string;
    extendZod: string;
    defaultInvisibleField: string[];
    defaultReadOnlyField: string[];
    provider?: string | undefined;
};

declare const generateSingleFile: ({ dmmf, path }: CreateOptions) => void;

declare const generateMultipleFiles: ({ dmmf, path }: CreateOptions) => void;

declare const writeModelFiles: CreateFiles;

declare const skipGenerator: () => boolean;

declare const writeModelOrType: ({ fileWriter: { writer, writeImport, writeImportSet, writeJSDoc, writeHeading, }, dmmf, getSingleFileContent, }: ContentWriterOptions, model: ExtendedDMMFModel) => void;
declare function writeModelOpenApi(model: ExtendedDMMFModel): lodash.Dictionary<string | boolean | null>;

declare function writeFieldOpenApi(field: ExtendedDMMFField): lodash.Dictionary<any>;

export { DirectoryHelper, ExtendedDMMF, ExtendedDMMFModel, FileWriter, generateMultipleFiles, generateSingleFile, loadDMMF, parseGeneratorConfig, skipGenerator, writeFieldOpenApi, writeModelFiles, writeModelOpenApi, writeModelOrType };
