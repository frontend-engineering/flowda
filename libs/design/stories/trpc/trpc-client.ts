import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { environment } from '../environments/environment'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: environment.FLOWDA_URL,
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          'x-from': 'flowda-theia-design',
          authorization: 'Bearer ' + localStorage.getItem('access_token'),
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
