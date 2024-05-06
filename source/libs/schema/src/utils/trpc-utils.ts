/// <reference types="@types/express-serve-static-core" />
/// <reference types="@types/qs" />

import consola from 'consola'
import * as _ from 'radash'
import * as trpcExpress from '@trpc/server/adapters/express'
import { DefaultErrorShape, ProcedureType, TRPCError, Unwrap } from '@trpc/server'
import { HttpException } from '@nestjs/common'
import { repeat } from 'lodash'
import { ctxTenantSchemaDto, ctxUserSchemaDto, TCtx } from '@flowda/types'
import { createId } from '@paralleldrive/cuid2'

export const REQ_END =
  '================================================ End ================================================\n'

export const ERROR_END = '***************************************** ERROR END *****************************************'

export function logInputSerialize(object: any) {
  setTimeout(function () {
    consola.info('request args  :')
    console.log(object)
    console.log()
  }, 0)
}

export function logOutputSerialize(object: any) {
  setTimeout(function () {
    console.log()
    if (object?.code < 0) {
      consola.info('response error:')
      console.log({
        ...object,
        message: '<...>',
        data: {
          ...object.data,
          stack: '<...>',
        },
      })
    } else {
      consola.info('response data :')
      const resp = JSON.stringify(object)
      if (resp.length > 1000) console.log(resp.slice(0, 1000) + '...')
      else console.log(object)
    }

    console.log(REQ_END + '\n')
  }, 0)
}

export function logContext(opts: trpcExpress.CreateExpressContextOptions) {
  setTimeout(function () {
    const req = opts.req
    console.log('=============================================== Start ===============================================')
    consola.info('url           :', req.url.split('?')[0])
    consola.info('from          :', req.headers['x-from'])
  }, 0)
}

export function getStatusKeyFromStatus(status: number) {
  return JSONRPC2_TO_HTTP_STATUS[status] ?? 'INTERNAL_SERVER_ERROR'
}

export function getErrorCodeFromKey(key: keyof typeof TRPC_ERROR_CODES_BY_KEY) {
  return TRPC_ERROR_CODES_BY_KEY[key] ?? -32603
}

const JSONRPC2_TO_HTTP_CODE: Record<keyof typeof TRPC_ERROR_CODES_BY_KEY, number> = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
}
const JSONRPC2_TO_HTTP_STATUS = _.invert(JSONRPC2_TO_HTTP_CODE)

const TRPC_ERROR_CODES_BY_KEY = {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  PARSE_ERROR: -32700,
  /**
   * The JSON sent is not a valid Request object.
   */
  BAD_REQUEST: -32600, // 400

  // Internal JSON-RPC error
  INTERNAL_SERVER_ERROR: -32603,
  NOT_IMPLEMENTED: -32603,

  // Implementation specific errors
  UNAUTHORIZED: -32001, // 401
  FORBIDDEN: -32003, // 403
  NOT_FOUND: -32004, // 404
  METHOD_NOT_SUPPORTED: -32005, // 405
  TIMEOUT: -32008, // 408
  CONFLICT: -32009, // 409
  PRECONDITION_FAILED: -32012, // 412
  PAYLOAD_TOO_LARGE: -32013, // 413
  UNPROCESSABLE_CONTENT: -32022, // 422
  TOO_MANY_REQUESTS: -32029, // 429
  CLIENT_CLOSED_REQUEST: -32099, // 499
} as const

export function logErrorStart(opts: { type: ProcedureType | 'unknown'; path: string | undefined; input: unknown }) {
  setTimeout(function () {
    consola.error('**************************************** ERROR START ****************************************')
    consola.info(`procedure    :`, `${opts.path}.${opts.type}`)
    consola.info(`input        :`)
    console.log(opts.input)
  }, 0)
}

export function logErrorEnd(opts: { error: TRPCError }) {
  setTimeout(function () {
    consola.info(`message      :`, opts.error.message)
    consola.info(`stack        :`, opts.error.stack)
    consola.error(ERROR_END)
  }, 0)
}

export function transformHttpException(
  opts: {
    type: ProcedureType | 'unknown'
    path: string | undefined
    input: unknown
    ctx: Unwrap<any> | undefined
    shape: DefaultErrorShape
  },
  json: {
    status: number
    message: string
    error: string
    stack?: string
  },
) {
  const shape = opts.shape
  const key = getStatusKeyFromStatus(json.status)
  const code = getErrorCodeFromKey(key)
  setTimeout(function () {
    consola.info(`cause`)
    console.log(`    status     :`, json.status)
    console.log(`    message    :`, json.message)
    console.log(`    error      :`, json.error)
    consola.info(`stack        :`, json.stack)
    consola.error(ERROR_END)
  }, 0)
  return {
    ...shape,
    code, // 替换成 nestjs HttpException 对应的 trpc error code
    // message // message 无需替代 throw new ConflictException('<message>') 第一个参数已经替代了 https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    data: {
      ...shape.data,
      ...{
        code: key, // 替换成 HttpException 对应的 短字符
        httpStatus: json.status, // 替换成 http status code
        description: {
          // 详情
          procedure: `${opts.path}.${opts.type}`,
          input: opts.input,
          error: json.error,
        },
      },
    },
  }
}

export function errorFormatter(
  opts: {
    type: ProcedureType | 'unknown'
    path: string | undefined
    input: unknown
    ctx: Unwrap<any> | undefined
    shape: DefaultErrorShape
    error: TRPCError
  },
  handlers?: {
    log?: (input: { requestId: string; tenantId: number; userId: number; log: any }) => Promise<void>
  },
) {
  let json = {
    procedure: `${opts.path}.${opts.type}`,
    input: opts.input,
    diagnosis: opts.ctx?._diagnosis || [],
  }
  const requestId = opts.ctx?.requestId || ''
  const tenantId = opts.ctx?.user?.tenantId || opts.ctx?.tenant?.id
  const userId = opts.ctx?.user?.id
  logErrorStart(opts)
  consola.info(`tenantId     :`, tenantId)
  consola.info(`userId       :`, userId)
  if (Array.isArray(opts.ctx?._diagnosis) && opts.ctx._diagnosis.length > 0) {
    consola.info(`trace:`)
    const msg = opts.ctx._diagnosis
      .map((m: any[]) => {
        const indent = repeat(' ', 4)
        const msg = m.map(i => (typeof i === 'string' ? i : JSON.stringify(i))).join(', ')
        return indent + msg
      })
      .join('\n')
    console.log(msg)
    console.log()
  }
  // 如果是 nestjs HttpException
  if (opts.error.cause instanceof HttpException) {
    const json2 = {
      status: opts.error.cause.getStatus(),
      message: (<any>opts.error.cause.getResponse())['message'],
      error: (<any>opts.error.cause.getResponse())['error'],
      stack: opts.error.stack,
    }
    json = Object.assign(json, json2)
    const ret = transformHttpException(opts, json2)
    if (typeof handlers?.log === 'function') {
      handlers.log({
        requestId,
        tenantId,
        userId,
        log: json,
      })
    }
    return ret
  } else {
    logErrorEnd(opts)
    json = Object.assign(json, {
      message: opts.error.message,
      stack: opts.error.stack,
    })
    if (typeof handlers?.log === 'function') {
      handlers.log({
        requestId,
        tenantId,
        userId,
        log: json,
      })
    }
    return opts.shape
  }
}

// object => object 是默认值
// https://github.com/trpc/trpc/blob/next/packages/client/src/internals/transformer.ts#L57
export const transformer = {
  input: {
    // on client
    serialize: (object: any) => object,
    // on server -> resolver
    deserialize: (object: any) => {
      logInputSerialize(object)
      return object
    },
  },
  output: {
    // on server -> client
    serialize: (object: any) => {
      logOutputSerialize(object)
      return object
    },
    // on client
    deserialize: (object: any) => object,
  },
}

export function createContext(opts: trpcExpress.CreateExpressContextOptions) {
  logContext(opts)
  const requestId = createId()
  opts.res.setHeader('x-request-id', requestId)
  consola.info('x-request-id  :', requestId)
  return {
    req: opts.req,
    res: opts.res,
    requestId,
    _diagnosis: [] as any[],
    user: undefined as ctxUserSchemaDto | undefined,
    tenant: undefined as ctxTenantSchemaDto | undefined,
  }
}

/**
 * 一个简单的基于 trpc ctx 的 诊断工具 报错之后会记录手动埋的路径，方便排查错误
 */
export function diag(ctx: TCtx | undefined, ...message: any[]) {
  ctx?._diagnosis != null && ctx._diagnosis.push(message)
}
