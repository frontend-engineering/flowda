import * as fs from 'fs-extra'
import * as path from 'path'

async function run() {
  const dirs = await fs.readdir(path.join(__dirname, '../src/parser/prisma-zod/__fixtures__'))
  console.log(dirs)
}

void run()
