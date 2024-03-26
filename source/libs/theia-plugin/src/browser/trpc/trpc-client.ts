import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { customLink } from './custom-link'
import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandRegistry } from '@theia/core'
import { environment } from '../environments/environment'

@injectable()
export class TrpcProxyClient {
  constructor(
    @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry,
  ) {}

  private trpcProxyClient = createTRPCProxyClient<AppRouter>({
    links: [
      customLink({
        commandRegistry: this.commandRegistry,
      }),
      httpBatchLink({
        url: environment.FLOWDA_URL,
        // You can pass any HTTP headers you wish here
        async headers() {
          return {
            'x-from': 'hello-world',
            authorization: 'Bearer ' + (localStorage.getItem('access_token') || ''),
          }
        },
      }),
    ],
    transformer: {
      input: {
        // on client
        serialize: object => object,
        // on server -> resolver
        deserialize: object => object,
      },
      output: {
        // on server -> client
        serialize: object => object,
        // on client
        deserialize: object => object,
      },
    },
  })

  public get client() {
    return this.trpcProxyClient
  }
}
