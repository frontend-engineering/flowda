import { z } from 'zod'
import { bizLibGroupGeneratorSchema } from './zod-def'
import {
  addProjectConfiguration,
  ensurePackage,
  generateFiles,
  GeneratorCallback,
  getWorkspaceLayout,
  joinPathFragments,
  names,
  offsetFromRoot,
  ProjectConfiguration,
  runTasksInSerial,
  Tree,
} from '@nrwl/devkit'
import consola from 'consola'
import * as path from 'path'
import * as _ from 'radash'
import { getRelativePathToRootTsConfig, initGenerator as jsInitGenerator, updateRootTsConfig } from '@nrwl/js'
import { nxVersion } from '@nrwl/js/src/utils/versions'

export default async function(tree: Tree, options: z.infer<typeof bizLibGroupGeneratorSchema>) {
  const groupName = _.dash(options.name)
  consola.start(`generate biz lib group ${groupName}`)
  const suffixes = ['types', 'services', 'trpc-server'] as const
  let tasks: GeneratorCallback[] = []
  for (const suffix of suffixes) {
    tasks = tasks.concat(await createLib(tree, groupName, suffix))
  }
  return runTasksInSerial(...tasks)
}

async function createLib(tree: Tree, groupName: string, suffix: 'types' | 'services' | 'trpc-server') {
  const tasks: GeneratorCallback[] = []

  const { libsDir, npmScope } = getWorkspaceLayout(tree)
  const projectName = `${groupName}-${suffix}`
  const projectRoot = path.join(libsDir, groupName, suffix)
  const importPath = `@${npmScope}/${projectName}`
  consola.info(`  ${projectRoot} (${importPath})`)

  tasks.push(await jsInitGenerator(tree, {}))

  generateFiles(tree, path.join(__dirname, 'files/lib'), projectRoot, {
    tmpl: '',
    projectName,
    projectRoot,
    importPath,
    offsetFromRoot: offsetFromRoot(projectRoot),
    rootTsConfigPath: getRelativePathToRootTsConfig(tree, projectRoot),
  })

  const { className, propertyName, fileName } = names(groupName)

  if (suffix === 'types') {
    generateFiles(tree, path.join(__dirname, 'files/types'), projectRoot, {
      tmpl: '',
      className,
      propertyName,
    })
  }

  if (suffix === 'services') {
    generateFiles(tree, path.join(__dirname, 'files/services'), projectRoot, {
      tmpl: '',
      className,
      propertyName,
      fileName,
      projectName,
      typesImportPath: `@${npmScope}/${groupName}-types`,
    })
  }

  addProject(tree, { projectName, projectRoot })

  const lintCallback = await addLint(tree, { projectName, projectRoot })
  tasks.push(lintCallback)

  const jestCallback = await addJest(tree, {
    projectName,
    testEnvironment: suffix === 'types' ? 'jsdom' : 'node',
  })
  tasks.push(jestCallback)

  updateRootTsConfig(tree,
    {
      name: projectName,
      importPath: importPath,
      projectRoot: projectRoot,
      js: false,
    })

  return tasks
}

function addProject(
  tree: Tree,
  options: {
    projectName: string
    projectRoot: string
  },
) {
  const projectConfiguration: ProjectConfiguration = {
    root: options.projectRoot,
    sourceRoot: joinPathFragments(options.projectRoot, 'src'),
    projectType: 'library',
    targets: {},
    tags: [],
  }

  const outputPath = `dist/${options.projectRoot}`

  projectConfiguration.targets.build = {
    executor: `@nrwl/js:tsc`,
    outputs: ['{options.outputPath}'],
    options: {
      outputPath,
      main: `${options.projectRoot}/src/index.ts`,
      tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
      assets: [],
    },
  }

  projectConfiguration.targets.build.options.assets ??= []
  projectConfiguration.targets.build.options.assets.push(
    joinPathFragments(options.projectRoot, '*.md'),
  )

  addProjectConfiguration(tree, options.projectName, projectConfiguration)
}

async function addLint(
  tree: Tree,
  options: {
    projectName: string
    projectRoot: string
  },
): Promise<GeneratorCallback> {
  const { lintProjectGenerator } = ensurePackage('@nrwl/linter', nxVersion)
  return lintProjectGenerator(tree, {
    project: options.projectName,
    linter: 'eslint',
    skipFormat: true,
    tsConfigPaths: [
      joinPathFragments(options.projectRoot, 'tsconfig.lib.json'),
    ],
    unitTestRunner: 'jest',
    eslintFilePatterns: [
      `${options.projectRoot}/**/*.ts`,
    ],
    setParserOptionsProject: false,
  })
}

async function addJest(
  tree: Tree,
  options: {
    projectName: string
    testEnvironment: 'jsdom' | 'node'
  },
): Promise<GeneratorCallback> {
  const { jestProjectGenerator } = ensurePackage('@nrwl/jest', nxVersion)
  return await jestProjectGenerator(tree, {
    ...options,
    project: options.projectName,
    setupFile: 'none',
    supportTsx: false,
    skipSerializers: true,
    testEnvironment: options.testEnvironment,
    skipFormat: true,
    compiler: 'tsc',
  })
}
