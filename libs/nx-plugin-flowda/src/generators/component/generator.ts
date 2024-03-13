import { Tree } from '@nrwl/devkit'
import { componentGeneratorSchema } from './schema'
import { z } from 'zod'
import { componentGenerator, componentStoryGenerator } from '@nrwl/react'
import consola from 'consola'

export default async function (tree: Tree, options: z.infer<typeof componentGeneratorSchema>) {
  consola.info(`Create a ${options.name} component to design project `)

  await componentGenerator(tree, {
    name: options.name,
    project: 'design',
    style: 'css',
    classComponent: true,
  })
  await componentStoryGenerator(tree, {
    project: 'design',
    componentPath: `lib/${options.name}/${options.name}.tsx`,
  })
}
