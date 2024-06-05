import { z, ZodErrorMap } from 'zod'
import { extendApi } from '@anatine/zod-openapi'
import { SchemaObject } from 'openapi3-ts'
import { ColumnKey, ResourceKey } from '../types/ui-schema-object'
import { AssociationKey, ReferenceKey } from '../types'

declare module 'zod' {
  interface ZodTypeDef {
    errorMap?: ZodErrorMap
    description?: string
    /**
     * OpenAPI metadata
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openapi?: any
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<SchemaObject>): T

    resource<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      // 使用 Partial 是考虑到 .extend .merge 的 schema 能覆盖某些 key
      metadata: Partial<ResourceKey>,
    ): T

    column<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<ColumnKey>): T

    association<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: AssociationKey): T

    reference<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: ReferenceKey): T
  }
}

export function extendZod(zod: typeof z, forceOverride = false) {
  if (forceOverride || typeof zod.ZodSchema.prototype.openapi === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    zod.ZodSchema.prototype.openapi = function (metadata?: any) {
      return extendApi(this, metadata)
    }
  }

  if (forceOverride || typeof zod.ZodSchema.prototype.resource === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    zod.ZodSchema.prototype.resource = function (metadata?: any) {
      return extendApi(this, metadata)
    }
  }

  if (forceOverride || typeof zod.ZodSchema.prototype.column === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    zod.ZodSchema.prototype.column = function (metadata?: any) {
      return extendApi(this, metadata)
    }
  }

  if (forceOverride || typeof zod.ZodSchema.prototype.reference === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    zod.ZodSchema.prototype.reference = function (metadata?: any) {
      return extendApi(this, metadata)
    }
  }

  if (forceOverride || typeof zod.ZodSchema.prototype.association === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    zod.ZodSchema.prototype.association = function (metadata?: any) {
      return extendApi(this, metadata)
    }
  }

  const zodObjectMerge = zod.ZodObject.prototype.merge

  zod.ZodObject.prototype.merge = function (...args) {
    const mergedResult = zodObjectMerge.apply(this, args)
    mergedResult._def.openapi = {
      ...this._def.openapi,
      ...args[0]._def.openapi,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return mergedResult as any
  }
}
