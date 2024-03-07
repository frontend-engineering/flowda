## Project Sturcutre

- `packages`
    - `theia-plugin-flowda`: Make theia into a SaaS
    - `flowda-schema`: engine to implement business logic
    - `flowda-gateway-services`: gateway to manage business logic
    - `flowda-gateway-trpc-server`: gateway API definitions

## Dependencies versions

Locking some fundamental componetns versions to reduce JavaScript fatigue, and allow for necessary customization.

- `nx@15.7.2`
- `@pnpm/lockfile-types@^4.3.6`, `pnpm@7.33.7`
