import { GeneratorOptions } from '@prisma/generator-helper';
export declare const parseGeneratorConfig: (generatorOptions: GeneratorOptions) => {
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
    provider?: string | undefined;
};
//# sourceMappingURL=parseGeneratorConfig.d.ts.map