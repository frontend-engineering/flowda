import * as path from 'path'
import { ExtendedDMMF, generateSingleFile, loadDMMF, parseGeneratorConfig } from 'zod-prisma-types'

describe('prisma-02', function () {
  it('test', async () => {
    const dmmf = await loadDMMF(path.join(__dirname, '../__fixtures__/prisma-02/prisma/schema.prisma'))
    const config = parseGeneratorConfig({
        datamodel: '',
        datasources: [],
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
            useMultipleFiles: 'true',
            addSelectType: 'false',
            writeNullishInModelTypes: 'true',
          },
          binaryTargets: [],
          previewFeatures: [],
          isCustomOutput: true,
        },
        dmmf: dmmf,
        otherGenerators: [],
        schemaPath: '',
        version: '',
      },
    )
    const extendedDMMF = new ExtendedDMMF(dmmf, config)

    generateSingleFile({
      dmmf: extendedDMMF,
      path: __dirname,
    })
  })
})
