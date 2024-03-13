import { applyChangesToString, ChangeType, generateFiles, getProjects, StringChange, Tree } from '@nrwl/devkit'
import { componentGeneratorSchema } from './schema'
import { z } from 'zod'
import consola from 'consola'
import * as path from 'path'
import * as _ from 'radash'
import { addImport } from '@nrwl/react/src/utils/ast-utils'
import { ensureTypescript } from '@nrwl/js/src/utils/typescript/ensure-typescript'
import type * as ts from 'typescript'
import { findNodes } from 'nx/src/utils/typescript'
import { insertImport } from '@nrwl/js'

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
  const modelFileName = _.dash(options.name) + '.model'

  generateFiles(host, path.join(__dirname, 'files'), path.join(designProject.sourceRoot, `${componentFileName}`), {
    componentName: _.pascal(options.name),
    componentFileName,
    modelName,
    modelFileName,
    modelSymbolName,
    tmpl: '',
  })

  updateDesignModule(host, {
    modelName, modelFileName, modelSymbolName, componentFileName,
  })

  addImportHelper(
    host,
    path.join(designProject.sourceRoot, 'index.ts'),
    `export * from './${componentFileName}/${componentFileName}'`,
  )

  const typesProject = getProjects(host).get('types')
  addImportHelper(
    host,
    path.join(typesProject.sourceRoot, 'symbols.ts'),
    `export const ${modelSymbolName} = Symbol.for('${modelName}')`,
  )
}

function addImportHelper(host: Tree, filePath: string, statement: string) {
  const source = host.read(filePath, 'utf-8')
  const sourceFile = tsModule.createSourceFile(
    filePath,
    source,
    tsModule.ScriptTarget.Latest,
    true,
  )
  const changes = applyChangesToString(
    source,
    addImport(
      sourceFile,
      statement,
    ),
  )
  host.write(filePath, changes)
}

export function addBind(
  source: ts.SourceFile,
  statement: string,
) {
  if (!tsModule) {
    tsModule = ensureTypescript()
  }
  const bindDesignModuleVarDec = findNodes(source, tsModule.SyntaxKind.VariableDeclaration).filter((node: ts.Node) => {
    if (tsModule.isVariableDeclaration(node)) {
      const varName = node.name.getText()
      return varName === 'bindDesignModule'
    }
  })
  const bindExp = findNodes(bindDesignModuleVarDec[0], tsModule.SyntaxKind.ExpressionStatement)
  const changes: StringChange[] = []

  changes.push({
    type: ChangeType.Insert,
    index: bindExp[bindExp.length - 1].getEnd(),
    text: `
  ${statement}`,
  })

  return changes
}

function updateDesignModule(host: Tree, opt: {
  componentFileName: string
  modelName: string,
  modelFileName: string
  modelSymbolName: string
}) {
  const { componentFileName, modelName, modelFileName, modelSymbolName } = opt
  const project = getProjects(host).get('design')
  const filePath = path.join(project.sourceRoot, 'designModule.ts')
  let source = host.read(filePath, 'utf-8')

  let sourceFile = tsModule.createSourceFile(
    filePath,
    source,
    tsModule.ScriptTarget.Latest,
    true,
  )
  sourceFile = insertImport(host, sourceFile, filePath, modelSymbolName, '@flowda/types')
  source = host.read(filePath, 'utf-8')

  const changes = applyChangesToString(
    source,
    [
      ...addImport(
        sourceFile,
        `import { ${modelName} } from './${componentFileName}/${modelFileName}'`,
      ),
      ...addBind(
        sourceFile,
        `bind<${modelName}>(${modelSymbolName}).to(${modelName}).inSingletonScope()`,
      ),
    ],
  )
  host.write(filePath, changes)
}
