import { type ExecutorContext, workspaceRoot } from '@nrwl/devkit'
import { z } from 'zod'
import { execSync } from 'child_process'
import { pm2DeployInput } from './zod-def'
import consola from 'consola'

const TAR_NAME = 'pm2-deploy.tar.gz'

export default async function* pm2DeployExecutor(_options: z.infer<typeof pm2DeployInput>, context?: ExecutorContext) {
  const opt = pm2DeployInput.parse(_options)
  consola.start(`run ${opt.buildTarget}`)
  execSync(`./node_modules/.bin/nx run ${opt.buildTarget}`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success(`done run ${opt.buildTarget}`)

  consola.start('tar')
  execSync(`tar --exclude "libquery_engine-*.node" -zcf ${TAR_NAME} ${opt.buildOutput} ${opt.extraOutput.join(' ')}`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done tar')

  consola.start('scp')
  const scpCmd = opt.pemPath ? `scp -i ${opt.pemPath}` : `scp`

  execSync(`${scpCmd} -r "./${TAR_NAME}" "${opt.user}@${opt.host}:${opt.path}"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done scp')

  const sshCmd = opt.pemPath ? `ssh -i ${opt.pemPath} "${opt.user}@${opt.host}"` : `ssh "${opt.user}@${opt.host}"`
  consola.start('untar')
  execSync(`${sshCmd} "cd ${opt.path} && tar -zxf ${TAR_NAME} -C ./release/"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done untar')

  consola.start('install deps')
  execSync(`${sshCmd} "cd ${opt.path}/release/${opt.buildOutput} && mkdir -p node_modules/@prisma"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  opt.extraOutput.forEach(output => {
    execSync(`${sshCmd} "cd ${opt.path}/release && cp -r ${output} ${opt.buildOutput}"`, {
      cwd: workspaceRoot,
      stdio: 'inherit',
    })
  })
  execSync(`${sshCmd} "cd ${opt.path}/release/${opt.buildOutput} && pnpm dlx pnpm@7.33.7 i --frozen-lockfile"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done install deps')

  consola.start('pm2 restart')
  execSync(`${sshCmd} "pm2 restart ${opt.pm2AppName}"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  execSync(`sleep 3`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  execSync(`${sshCmd} "pm2 logs ${opt.pm2AppName} --nostream"`, {
    cwd: workspaceRoot,
    stdio: 'inherit',
  })
  consola.success('done pm2 restart')
  return {
    success: true,
  }
}
