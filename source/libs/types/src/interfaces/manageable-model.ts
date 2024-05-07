import { URI } from '@theia/core'
export interface ManageableModel {
  getUri(): string

  setUri(uri: string | URI): void

  resetGridReadyPromise(uri: string | URI): void
}
