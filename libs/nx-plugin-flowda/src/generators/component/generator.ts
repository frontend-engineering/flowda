import { generateFiles, getProjects, Tree } from '@nrwl/devkit'
import { componentGeneratorSchema } from './schema'
import { z } from 'zod'
import consola from 'consola'
import * as path from 'path'
import * as _ from 'radash'

export default async function (tree: Tree, options: z.infer<typeof componentGeneratorSchema>) {
  consola.info(`Create a ${options.name} component to design project `)
  const project = getProjects(tree).get('design')
  generateFiles(tree, path.join(__dirname, 'files'), path.join(project.sourceRoot, 'src/lib'), {
    componentName: _.pascal(options.name),
    componentFileName: _.dash(options.name),
    modelName: _.pascal(options.name) + 'Model',
    modelFileName: _.dash(options.name) + '.model',
    modelSymbolName: _.pascal(options.name) + 'ModelSymbol',
    tmpl: '',
  })
}
