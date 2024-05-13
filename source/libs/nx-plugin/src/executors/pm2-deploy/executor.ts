import { type ExecutorContext, workspaceRoot } from '@nrwl/devkit'
import { z } from 'zod'
import { execSync } from 'child_process'
import { pm2DeployInput } from './zod-def'
import consola from 'consola'

const TAR_NAME = 'pm2-deploy.tar.gz'

export default async function* pm2DeployExecutor(_options: z.infer<typeof pm2DeployInput>, context?: ExecutorContext) {
  const options = pm2DeployInput.parse(_options)
  consola.start(`run ${options.buildTarget}`)
  execSync(`./node_modules/.bin/nx run ${options.buildTarget}`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success(`done run ${options.buildTarget}`)

  consola.start('tar')
  execSync(
    `tar --exclude "libquery_engine-*.node" -zcf ${TAR_NAME} ${options.buildOutput} ${options.extraOutput.join(' ')}`,
    {
      cwd: workspaceRoot,
      stdio: 'inherit',
    },
  )
  consola.success('done tar')

  consola.start('scp')
  execSync(`scp -r "./${TAR_NAME}" "${options.user}@${options.host}:${options.path}"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done scp')

  consola.start('untar')
  execSync(`ssh "${options.user}@${options.host}" "cd ${options.path} && tar -zxf ${TAR_NAME} -C ./release/"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done untar')

  consola.start('install deps')
  execSync(
    `ssh "${options.user}@${options.host}" "cd ${options.path}/release/${options.buildOutput} && mkdir -p node_modules/@prisma"`,
    {
      cwd: workspaceRoot,
      stdio: 'inherit',
    },
  )
  options.extraOutput.forEach(output => {
    execSync(
      `ssh "${options.user}@${options.host}" "cd ${options.path}/release && cp -r ${output} ${options.buildOutput}"`,
      {
        cwd: workspaceRoot,
        stdio: 'inherit',
      },
    )
  })
  execSync(
    `ssh "${options.user}@${options.host}" "cd ${options.path}/release/${options.buildOutput} && pnpm dlx pnpm@7.33.7 i --frozen-lockfile"`,
    {
      cwd: workspaceRoot,
      stdio: 'inherit',
    },
  )
  consola.success('done install deps')

  consola.start('pm2 restart')
  execSync(`ssh "${options.user}@${options.host}" "pm2 restart wms-api-uat"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  execSync(`ssh "${options.user}@${options.host}" "pm2 restart ${options.pm2AppName}"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  execSync(`sleep 3`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  execSync(`ssh "${options.user}@${options.host}" "pm2 logs ${options.pm2AppName} --nostream"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done pm2 restart')
  return {
    success: true,
  }
}
