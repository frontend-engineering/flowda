import * as path from 'path'
import { ExtendedDMMF, loadDMMF, parseGeneratorConfig } from 'zod-prisma-types'
import { writeSingleFileModelStatements } from './utils/write-single-file-model-statements'
import { createGeneratorOptions } from './utils/generator-options'
import { DMMF, GeneratorOptions } from '@prisma/generator-helper'

describe('prisma-03', function () {
  let dmmf: DMMF.Document
  let generatorOptions: GeneratorOptions
  beforeAll(async () => {
    dmmf = await loadDMMF(path.join(__dirname, '../__fixtures__/prisma-03/prisma/schema.prisma'))
    generatorOptions = createGeneratorOptions({ dmmf })
  })

  it('writeSingleFileModelStatements', async () => {
    const config = parseGeneratorConfig(generatorOptions)
    const extendedDMMF = new ExtendedDMMF(dmmf, config)
    const fileWriter = writeSingleFileModelStatements({ dmmf: extendedDMMF })
    expect(fileWriter.writer.toString()).toMatchInlineSnapshot(`
      "

      /////////////////////////////////////////
      // USER SCHEMA
      /////////////////////////////////////////

      export const UserSchema = z.object({
        id: z.number().int().column({
          display_name: 'Id',
          column_type: 'Int',
          visible: true,
          access_type: 'read_write'
        }),
        createdAt: z.date().column({
          display_name: 'Created At',
          column_type: 'DateTime',
          access_type: 'read_only',
          visible: true
        }),
        updatedAt: z.date().column({
          display_name: 'Updated At',
          column_type: 'DateTime',
          visible: true,
          access_type: 'read_only'
        }),
        isDeleted: z.boolean().column({
          display_name: 'Is Deleted',
          column_type: 'Boolean',
          visible: false,
          access_type: 'read_only'
        }),
        email: z.string().column({
          display_name: '邮箱',
          column_type: 'String',
          visible: true,
          access_type: 'read_write'
        }),
        name: z.string().nullish().column({
          display_name: '用户名',
          column_type: 'String',
          visible: false,
          plugins: { legacy: { prisma: 'false' } },
          access_type: 'read_write'
        }),
        extendedDescriptionData: z.any().optional().nullish().column({
          display_name: 'Extended Description Data',
          column_type: 'Json',
          visible: true,
          access_type: 'read_write'
        }),
      }).resource({
        name: 'User',
        slug: 'users',
        table_name: 'User',
        class_name: 'User',
        display_name: '员工',
        primary_key: 'id',
        visible: true,
        display_primary_key: 'false',
        display_column: 'email',
        searchable_columns: 'email,name',
        plugins: { legacy: { route_prefix: '/admin' } }
      })

      export type User = z.infer<typeof UserSchema>
      "
    `)
  })
})
