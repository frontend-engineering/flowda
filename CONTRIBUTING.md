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

### Patches

see `patches/`
