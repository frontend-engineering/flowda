## Project Structure

- `packages`
  - `design`: SaaS components
  - `schema`: ui schema engine, utils
  - `types`: type definitions, zod schema, symbols, etc.
  - `nx-plugin`: generators and executors

## Lock some dependencies' versions

Locking some fundamental componetns versions to reduce JavaScript fatigue, and allow for necessary customization.

- `nx@15.9.7`, and only allow following plugins. Write custom plugin if not satisfied.
  - `@nrwl/workspace`
  - `@nrlw/js` - compile
  - `@nrwl/linter` - lint
  - `@nrwl/eslint-plugin-nx` - write custom nx plugin
  - `@nrwl/jest` - test
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

But swc cannot parse `<const>` or `as const`

```ts
// https://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type
const mem = {
  id: { filterType: <const>'number', type: <const>'equals', filter: 1 },
}
```

## Generator

AST utilities alternative

- ts-morph
- magicast
