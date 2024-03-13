import { applyChangesToString, generateFiles, getProjects, Tree } from '@nrwl/devkit'
import { componentGeneratorSchema } from './schema'
import { z } from 'zod'
import consola from 'consola'
import * as path from 'path'
import * as _ from 'radash'
import { addImport } from '@nrwl/react/src/utils/ast-utils'
import { ensureTypescript } from '@nrwl/js/src/utils/typescript/ensure-typescript'

let tsModule: typeof import('typescript')

export default async function (host: Tree, options: z.infer<typeof componentGeneratorSchema>) {
  if (!tsModule) {
    tsModule = ensureTypescript()
  }

  consola.info(`Create a ${options.name} component to design project `)
  const designProject = getProjects(host).get('design')
  const componentFileName = _.dash(options.name)
  const modelSymbolName = _.pascal(options.name) + 'ModelSymbol'
  const modelName = _.pascal(options.name) + 'Model'
  generateFiles(host, path.join(__dirname, 'files'), path.join(designProject.sourceRoot, `lib/${componentFileName}`), {
    componentName: _.pascal(options.name),
    componentFileName: componentFileName,
    modelName: modelName,
    modelFileName: _.dash(options.name) + '.model',
    modelSymbolName: modelSymbolName,
    tmpl: '',
  })
  const typesProject = getProjects(host).get('types')

  const symbolsFilePath = path.join(typesProject.sourceRoot, 'lib/symbols.ts')
  const symbolsSource = host.read(symbolsFilePath, 'utf-8')
  const symbolsSourceFile = tsModule.createSourceFile(
    symbolsFilePath,
    symbolsSource,
    tsModule.ScriptTarget.Latest,
    true,
  )
  const changes = applyChangesToString(
    symbolsSource,
    addImport(
      symbolsSourceFile,
      `export const ${modelSymbolName} = Symbol.for('${modelName}')`,
    ),
  )
  host.write(symbolsFilePath, changes)

}
