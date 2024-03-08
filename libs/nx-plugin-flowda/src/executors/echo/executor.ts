import type { ExecutorContext } from '@nrwl/devkit';
import { EchoExecutorSchema } from './schema';
import { execSync } from 'child_process'

export default async function runExecutor(
  options: EchoExecutorSchema,
  context?: ExecutorContext,
) {
  console.log('Executor ran for Echo', options);
  execSync(`echo ${options.textToEcho}`, {
    stdio: 'inherit'
  })
  return {
    success: true
  };
}

