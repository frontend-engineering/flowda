## Project Sturcutre

- `packages`
    - `design`: SaaS components
    - `schema`: parse prisma DSL to zod, zod to UI schema, parse UI schema to prisma query, etc.
    - `types`: typescript type definitions, zod schema, symbols

## Lock some dependencies' versions

Locking some fundamental componetns versions to reduce JavaScript fatigue, and allow for necessary customization.

- `nx@15.9.7`, and only allow following plugins. Write custom plugin if not satisfied.
    - `@nrwl/workspace`
    - `@nrlw/js`
    - `@nrwl/linter`
    - `@nrwl/eslint-plugin-nx`
    - `@nrwl/jest`
- `@pnpm/lockfile-types@^5.0.0`, `pnpm@7.33.7`

## Storybook

Ways to speed up compilation

- swc 8s -> 5s
- rspack <800ms

swc

```diff
- ./storybook/rspack.config.js

+ name: '@storybook/react-webpack5',
- name: 'storybook-react-rspack',

+ {
+   name: 'storybook-addon-swc',
+   options: {
+     swcLoaderOptions /* https:+storybook.js.org/addons/storybook-addon-swc */: {
+       jsc /* https:+swc.rs/docs/configuration/compilation#jsctransformlegacydecorator */: {
+         parser: {
+           decorators: true
+         },
+         transform: {
+           legacyDecorator: true
+         }
+       }
+     }
+
+   }
+ },
```

rspack

```diff
- name: '@storybook/react-webpack5',
+ name: 'storybook-react-rspack',

+ ./storybook/rspack.config.js
```

## jest

use swc to speed up test
```diff
- '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
+ '^.+\\.[tj]sx?$': [
+   '@swc/jest', {
+     jsc: {
+       parser: {
+         decorators: true,
+       },
+       transform: {
+         legacyDecorator: true,
+         react: { runtime: 'automatic' },
+       },
+     },
+   },
+ ],
```
But swc cannot parse `<const>`
```ts
// https://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type
const mem = {
  id: { filterType: <const>'number', type: <const>'equals', filter: 1 },
}
```
