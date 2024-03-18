import * as fs from 'fs-extra'
import * as path from 'path'
import consola from 'consola'
import { execSync } from 'child_process'

const FIXTURES_DIR = path.join(__dirname, '../src/parser/prisma-zod/__fixtures__')

async function run() {
  const dirs = (await fs.readdir(FIXTURES_DIR, {
    withFileTypes: true,
  }))
    .filter(dir => dir.name.startsWith('prisma-'))
    .map(dir => dir.name)

  for (const dir of dirs) {
    consola.start(`run ${dir}`)
    console.time(dir)
    execSync(`npm run generate`, {
      cwd: path.join(FIXTURES_DIR, dir),
      stdio: 'inherit',
    })
    console.timeEnd(dir)
    consola.success(`run ${dir}`)
  }
}

void run()
