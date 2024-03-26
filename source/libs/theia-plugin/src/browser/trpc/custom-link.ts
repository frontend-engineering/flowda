import type { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { TRPCLink } from '@trpc/client'
import { observable } from '@trpc/server/observable'
import { CommandRegistry } from '@theia/core'

export const customLink: (opts: {
  commandRegistry: CommandRegistry
}) => TRPCLink<AppRouter> = opts => {
  // here we just got initialized in the app - this happens once per app
  // useful for storing cache for instance
  return () => ({ next, op }) => {
    // this is when passing the result to the next link
    // each link needs to return an observable which propagates results
    return observable(observer => {
      // console.log('performing operation:', op)
      const unsubscribe = next(op).subscribe({
        next(value) {
          // console.log('we received value', value)
          observer.next(value)
        },
        async error(err) {
          if (err.data && err.data.code === 'UNAUTHORIZED') {
            localStorage.removeItem('access_token')
            await opts.commandRegistry.executeCommand('command.hello.login')
          }
          // console.log('we received error', err)
          observer.error(err)
        },
        complete() {
          observer.complete()
        },
      })
      return unsubscribe
    })
  }
}
