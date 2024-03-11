import { Tree } from '@nrwl/devkit'
import { componentGeneratorSchema } from './schema'
import { z } from 'zod'
import { componentGenerator, componentStoryGenerator } from '@nrwl/react'

export default async function (tree: Tree, options: z.infer<typeof componentGeneratorSchema>) {
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
