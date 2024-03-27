import { DMMF, GeneratorOptions } from '@prisma/generator-helper'

export function createGeneratorOptions({ dmmf }: {
  dmmf: DMMF.Document,
}): GeneratorOptions {
  return {
    datamodel: '',
    datasources: [
      {
        name: 'db',
        provider: 'mysql',
        activeProvider: 'mysql',
        url: { fromEnvVar: 'DATABASE_URL', value: null },
        schemas: [],
      },
    ],
    generator: {
      name: 'zod',
      provider: {
        fromEnvVar: null,
        value: '',
      },
      output: {
        value: '',
        fromEnvVar: null,
      },
      config: {
        createRelationValuesTypes: 'true',
        addIncludeType: 'false',
        coerceDate: 'false',
        addInputTypeValidation: 'false',
        createInputTypes: 'false',
        useMultipleFiles: 'false',
        addSelectType: 'false',
        writeNullishInModelTypes: 'true',
        extendZod: './placeholder'
      },
      binaryTargets: [],
      previewFeatures: [],
      isCustomOutput: true,
    },
    dmmf: dmmf,
    otherGenerators: [],
    schemaPath: '',
    version: '',
    dataProxy: false,
  }
}
