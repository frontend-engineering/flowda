import type { ExecutorContext } from '@nrwl/devkit'
import { runExecutor } from '@nrwl/devkit'
import { DevExecutorSchema } from './schema'
import { execSync } from 'child_process'

export default async function* devExecutor(
  options: DevExecutorSchema,
  context?: ExecutorContext,
) {
  for await (const output of await runExecutor(
    { project: context.projectName, target: options.buildTarget, configuration: context.configurationName },
    { watch: true },
    context,
  )) {
    if (options.yalc) {
      execSync(`yalc publish --push --changed`, {
        cwd: context.workspace.projects[context.projectName].targets[options.buildTarget].options.outputPath,
        stdio: 'inherit',
      })
    }
    yield output
  }
}
