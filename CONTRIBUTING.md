## Project Sturcutre

- `packages`
    - `theia-plugin-flowda`: Make theia into a SaaS
    - `schema`: engine to implement business logic
    - `gateway`: gateway to manage business logic
    - `gateway-trpc-server`: gateway API definitions

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
