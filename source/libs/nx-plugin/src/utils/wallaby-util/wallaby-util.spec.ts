import * as path from 'path'
import { createWallabyConfigFromNxIgnore } from './wallaby-util'

describe('wallaby util', () => {
  it('can config wallaby files by .nxignore', async () => {
    const config = await createWallabyConfigFromNxIgnore(path.join(__dirname, '__fixtures__/.nxignore.fixture'))
    expect(config).toMatchInlineSnapshot(`
      {
        "filesOverride": [
          "libs/eslint-plugin-boot/src/**/*.ts",
          "!libs/eslint-plugin-boot/src/**/*.spec.ts",
          "libs/nx-plugin/src/**/*.ts",
          "!libs/nx-plugin/src/**/*.spec.ts",
          "libs/schema/src/**/*.ts",
          "!libs/schema/src/**/*.spec.ts",
          "libs/types/src/**/*.ts",
          "!libs/types/src/**/*.spec.ts",
        ],
        "testsOverride": [
          "libs/eslint-plugin-boot/src/**/*.spec.ts",
          "libs/nx-plugin/src/**/*.spec.ts",
          "libs/schema/src/**/*.spec.ts",
          "libs/types/src/**/*.spec.ts",
        ],
      }
    `)
  })
})
