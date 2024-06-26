/// <reference types="@types/qs" />
import { ContainerModule } from 'inversify'
import * as _yalc__prisma_client_flowda from '.yalc/@prisma/client-flowda'
import * as _trpc_server from '@trpc/server'
import * as _flowda_types from '@flowda/types'
import * as express from 'express'
import * as qs from 'qs'
import * as express_serve_static_core from 'express-serve-static-core'
import { LoggerService, INestApplication } from '@nestjs/common'
import * as trpcExpress from '@trpc/server/adapters/express'
import { AxiosInstance } from 'axios'
import * as znv_dist_util from 'znv/dist/util'

declare const flowdaGatewayTrpcServerModule: ContainerModule

declare class TrpcService {
  private readonly logger
  constructor(loggerFactory: (name: string) => LoggerService)
  trpc: {
    _config: _trpc_server.RootConfig<{
      ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      meta: object
      errorShape: _trpc_server.DefaultErrorShape
      transformer: {
        input: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
        output: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
      }
    }>
    procedure: _trpc_server.ProcedureBuilder<{
      _config: _trpc_server.RootConfig<{
        ctx: {
          req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
          res: express.Response<any, Record<string, any>>
          requestId: string
          _diagnosis: any[]
          user: _flowda_types.ctxUserSchemaDto | undefined
          tenant: _flowda_types.ctxTenantSchemaDto | undefined
        }
        meta: object
        errorShape: _trpc_server.DefaultErrorShape
        transformer: {
          input: {
            serialize: (object: any) => any
            deserialize: (object: any) => any
          }
          output: {
            serialize: (object: any) => any
            deserialize: (object: any) => any
          }
        }
      }>
      _ctx_out: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      _input_in: typeof _trpc_server.unsetMarker
      _input_out: typeof _trpc_server.unsetMarker
      _output_in: typeof _trpc_server.unsetMarker
      _output_out: typeof _trpc_server.unsetMarker
      _meta: object
    }>
    middleware: <
      TNewParams extends _trpc_server.ProcedureParams<
        _trpc_server.AnyRootConfig,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown,
        unknown
      >,
    >(
      fn: _trpc_server.MiddlewareFunction<
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _ctx_out: {}
          _input_out: typeof _trpc_server.unsetMarker
          _input_in: unknown
          _output_in: unknown
          _output_out: unknown
          _meta: object
        },
        TNewParams
      >,
    ) => _trpc_server.MiddlewareBuilder<
      {
        _config: _trpc_server.RootConfig<{
          ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            requestId: string
            _diagnosis: any[]
            user: _flowda_types.ctxUserSchemaDto | undefined
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          meta: object
          errorShape: _trpc_server.DefaultErrorShape
          transformer: {
            input: {
              serialize: (object: any) => any
              deserialize: (object: any) => any
            }
            output: {
              serialize: (object: any) => any
              deserialize: (object: any) => any
            }
          }
        }>
        _ctx_out: {}
        _input_out: typeof _trpc_server.unsetMarker
        _input_in: unknown
        _output_in: unknown
        _output_out: unknown
        _meta: object
      },
      TNewParams
    >
    router: <TProcRouterRecord extends _trpc_server.ProcedureRouterRecord>(
      procedures: TProcRouterRecord,
    ) => _trpc_server.CreateRouterInner<
      _trpc_server.RootConfig<{
        ctx: {
          req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
          res: express.Response<any, Record<string, any>>
          requestId: string
          _diagnosis: any[]
          user: _flowda_types.ctxUserSchemaDto | undefined
          tenant: _flowda_types.ctxTenantSchemaDto | undefined
        }
        meta: object
        errorShape: _trpc_server.DefaultErrorShape
        transformer: {
          input: {
            serialize: (object: any) => any
            deserialize: (object: any) => any
          }
          output: {
            serialize: (object: any) => any
            deserialize: (object: any) => any
          }
        }
      }>,
      TProcRouterRecord
    >
    mergeRouters: typeof _trpc_server.mergeRouters
    createCallerFactory: <
      TRouter extends _trpc_server.Router<
        _trpc_server.AnyRouterDef<
          _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>,
          any
        >
      >,
    >(
      router: TRouter,
    ) => _trpc_server.RouterCaller<TRouter['_def']>
  }
  procedure: _trpc_server.ProcedureBuilder<{
    _config: _trpc_server.RootConfig<{
      ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      meta: object
      errorShape: _trpc_server.DefaultErrorShape
      transformer: {
        input: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
        output: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
      }
    }>
    _ctx_out: {
      req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
      res: express.Response<any, Record<string, any>>
      requestId: string
      _diagnosis: any[]
      user: _flowda_types.ctxUserSchemaDto | undefined
      tenant: _flowda_types.ctxTenantSchemaDto | undefined
    }
    _input_in: typeof _trpc_server.unsetMarker
    _input_out: typeof _trpc_server.unsetMarker
    _output_in: typeof _trpc_server.unsetMarker
    _output_out: typeof _trpc_server.unsetMarker
    _meta: object
  }>
  protectedProcedure: _trpc_server.ProcedureBuilder<{
    _config: _trpc_server.RootConfig<{
      ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      meta: object
      errorShape: _trpc_server.DefaultErrorShape
      transformer: {
        input: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
        output: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
      }
    }>
    _meta: object
    _ctx_out: {
      user: _flowda_types.ctxUserSchemaDto | undefined
      requestId: string
      req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
      res: express.Response<any, Record<string, any>>
      _diagnosis: any[]
      tenant: _flowda_types.ctxTenantSchemaDto | undefined
    }
    _input_in: typeof _trpc_server.unsetMarker
    _input_out: typeof _trpc_server.unsetMarker
    _output_in: typeof _trpc_server.unsetMarker
    _output_out: typeof _trpc_server.unsetMarker
  }>
  router: <TProcRouterRecord extends _trpc_server.ProcedureRouterRecord>(
    procedures: TProcRouterRecord,
  ) => _trpc_server.CreateRouterInner<
    _trpc_server.RootConfig<{
      ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      meta: object
      errorShape: _trpc_server.DefaultErrorShape
      transformer: {
        input: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
        output: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
      }
    }>,
    TProcRouterRecord
  >
  mergeRouters: typeof _trpc_server.mergeRouters
}

declare class ContextFactory {
  private readonly logger
  constructor(loggerFactory: (name: string) => LoggerService)
  createContext: (opts: trpcExpress.CreateExpressContextOptions) => Promise<{
    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
    res: express.Response<any, Record<string, any>>
    requestId: string
    _diagnosis: any[]
    user: _flowda_types.ctxUserSchemaDto | undefined
    tenant: _flowda_types.ctxTenantSchemaDto | undefined
  }>
}

type Service = {
  /**
   * @description 对应租户名称
   */
  id: string
  name: string
  trpcEndpoint: string
}
declare class GatewayRegister {
  private readonly logger
  constructor(loggerFactory: (name: string) => LoggerService)
  register(serv: Service | Service[]): void
  private registerItem
  private _services
  get services(): Service[]
  getTrpc(serviceId: string): Service
}
declare class HelloRouter {
  private trpc
  private axios
  private gatewayRegister
  private readonly logger
  constructor(
    trpc: TrpcService,
    axios: AxiosInstance,
    gatewayRegister: GatewayRegister,
    loggerFactory: (name: string) => LoggerService,
  )
  helloRouter: _trpc_server.CreateRouterInner<
    _trpc_server.RootConfig<{
      ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      meta: object
      errorShape: _trpc_server.DefaultErrorShape
      transformer: {
        input: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
        output: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
      }
    }>,
    {
      validate: _trpc_server.BuildProcedure<
        'mutation',
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _meta: object
          _ctx_out: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            requestId: string
            _diagnosis: any[]
            user: _flowda_types.ctxUserSchemaDto | undefined
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          _input_in: {
            username: string
            password: string
          }
          _input_out: {
            username: string
            password: string
          }
          _output_in: typeof _trpc_server.unsetMarker
          _output_out: typeof _trpc_server.unsetMarker
        },
        {
          user: Omit<
            {
              id: number
              username: string
              email: string | null
              image: string | null
              hashedPassword: string | null
              hashedRefreshToken: string | null
              tenantId: number
              tenant: {
                name: string
              }
              orderProfile: {
                productType: _yalc__prisma_client_flowda.ProductType
                plan: number | null
                amount: number | null
                expireAt: Date | null
              } | null
              weixinProfile: {
                unionid: string | null
                loginOpenid: string | null
                headimgurl: string | null
                nickname: string | null
                sex: number | null
              } | null
            },
            'hashedPassword' | 'hashedRefreshToken'
          >
          rt: {
            token: string
            iat: number
            exp: number
          }
          at: {
            token: string
            iat: number
            exp: number
          }
        }
      >
      createRoot: _trpc_server.BuildProcedure<
        'query',
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _meta: object
          _ctx_out: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            requestId: string
            _diagnosis: any[]
            user: _flowda_types.ctxUserSchemaDto | undefined
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          _input_in: any
          _input_out: any
          _output_in: typeof _trpc_server.unsetMarker
          _output_out: typeof _trpc_server.unsetMarker
        },
        {
          id: string
          name: string
          visible: boolean
          children: {
            selected: boolean
            expanded: boolean
            children: never[]
            /**
             * @description 对应租户名称
             */
            id: string
            name: string
          }[]
        }
      >
      resolveChildren: _trpc_server.BuildProcedure<
        'query',
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _meta: object
          _ctx_out: {
            user: _flowda_types.ctxUserSchemaDto | undefined
            requestId: string
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            _diagnosis: any[]
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          _input_in: {
            pid: string
          }
          _input_out: {
            pid: string
          }
          _output_in: typeof _trpc_server.unsetMarker
          _output_out: typeof _trpc_server.unsetMarker
        },
        | {
            id: string
            name: string
            selected: boolean
            uri: string | undefined
            expanded: boolean | undefined
            children: never[] | undefined
          }[]
        | undefined
      >
      getResourceSchema: _trpc_server.BuildProcedure<
        'query',
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _meta: object
          _ctx_out: {
            user: _flowda_types.ctxUserSchemaDto | undefined
            requestId: string
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            _diagnosis: any[]
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          _input_in: {
            schemaName: string
          }
          _input_out: {
            schemaName: string
          }
          _output_in: typeof _trpc_server.unsetMarker
          _output_out: typeof _trpc_server.unsetMarker
        },
        any
      >
      getResourceData: _trpc_server.BuildProcedure<
        'query',
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _meta: object
          _ctx_out: {
            user: _flowda_types.ctxUserSchemaDto | undefined
            requestId: string
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            _diagnosis: any[]
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          _input_in:
            | {
                sort: {
                  sort: 'asc' | 'desc'
                  colId: string
                }[]
                schemaName: string
                current: number
                pageSize: number
                filterModel: Record<
                  string,
                  | {
                      filterType: 'number' | 'text'
                      filter: string | number
                      type: 'contains' | 'equals'
                    }
                  | {
                      filterType: 'text'
                      operator: 'OR' | 'AND'
                      conditions: {
                        filterType: 'number' | 'text'
                        filter: string | number
                        type: 'contains' | 'equals'
                      }[]
                    }
                >
              }
            | {
                schemaName: string
                id: number
              }
          _input_out:
            | {
                sort: {
                  sort: 'asc' | 'desc'
                  colId: string
                }[]
                schemaName: string
                current: number
                pageSize: number
                filterModel: Record<
                  string,
                  | {
                      filterType: 'number' | 'text'
                      filter: string | number
                      type: 'contains' | 'equals'
                    }
                  | {
                      filterType: 'text'
                      operator: 'OR' | 'AND'
                      conditions: {
                        filterType: 'number' | 'text'
                        filter: string | number
                        type: 'contains' | 'equals'
                      }[]
                    }
                >
              }
            | {
                schemaName: string
                id: number
              }
          _output_in: typeof _trpc_server.unsetMarker
          _output_out: typeof _trpc_server.unsetMarker
        },
        any
      >
      putResourceData: _trpc_server.BuildProcedure<
        'mutation',
        {
          _config: _trpc_server.RootConfig<{
            ctx: {
              req: express.Request<
                express_serve_static_core.ParamsDictionary,
                any,
                any,
                qs.ParsedQs,
                Record<string, any>
              >
              res: express.Response<any, Record<string, any>>
              requestId: string
              _diagnosis: any[]
              user: _flowda_types.ctxUserSchemaDto | undefined
              tenant: _flowda_types.ctxTenantSchemaDto | undefined
            }
            meta: object
            errorShape: _trpc_server.DefaultErrorShape
            transformer: {
              input: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
              output: {
                serialize: (object: any) => any
                deserialize: (object: any) => any
              }
            }
          }>
          _meta: object
          _ctx_out: {
            user: _flowda_types.ctxUserSchemaDto | undefined
            requestId: string
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            _diagnosis: any[]
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          _input_in: {
            id: number
            schemaName: string
            updatedValue?: any
          }
          _input_out: {
            id: number
            schemaName: string
            updatedValue?: any
          }
          _output_in: typeof _trpc_server.unsetMarker
          _output_out: typeof _trpc_server.unsetMarker
        },
        any
      >
    }
  >
  getSchema(tenantName: string, schemaName: string): Promise<any>
}

declare class TrpcRouter {
  private trpc
  private helloRouter
  private contextFactory
  private readonly logger
  constructor(
    trpc: TrpcService,
    helloRouter: HelloRouter,
    contextFactory: ContextFactory,
    loggerFactory: (name: string) => LoggerService,
  )
  appRouter: _trpc_server.CreateRouterInner<
    _trpc_server.RootConfig<{
      ctx: {
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
        res: express.Response<any, Record<string, any>>
        requestId: string
        _diagnosis: any[]
        user: _flowda_types.ctxUserSchemaDto | undefined
        tenant: _flowda_types.ctxTenantSchemaDto | undefined
      }
      meta: object
      errorShape: _trpc_server.DefaultErrorShape
      transformer: {
        input: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
        output: {
          serialize: (object: any) => any
          deserialize: (object: any) => any
        }
      }
    }>,
    {
      hello: _trpc_server.CreateRouterInner<
        _trpc_server.RootConfig<{
          ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>
            res: express.Response<any, Record<string, any>>
            requestId: string
            _diagnosis: any[]
            user: _flowda_types.ctxUserSchemaDto | undefined
            tenant: _flowda_types.ctxTenantSchemaDto | undefined
          }
          meta: object
          errorShape: _trpc_server.DefaultErrorShape
          transformer: {
            input: {
              serialize: (object: any) => any
              deserialize: (object: any) => any
            }
            output: {
              serialize: (object: any) => any
              deserialize: (object: any) => any
            }
          }
        }>,
        {
          validate: _trpc_server.BuildProcedure<
            'mutation',
            {
              _config: _trpc_server.RootConfig<{
                ctx: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >
                  res: express.Response<any, Record<string, any>>
                  requestId: string
                  _diagnosis: any[]
                  user: _flowda_types.ctxUserSchemaDto | undefined
                  tenant: _flowda_types.ctxTenantSchemaDto | undefined
                }
                meta: object
                errorShape: _trpc_server.DefaultErrorShape
                transformer: {
                  input: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                  output: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                }
              }>
              _meta: object
              _ctx_out: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >
                res: express.Response<any, Record<string, any>>
                requestId: string
                _diagnosis: any[]
                user: _flowda_types.ctxUserSchemaDto | undefined
                tenant: _flowda_types.ctxTenantSchemaDto | undefined
              }
              _input_in: {
                username: string
                password: string
              }
              _input_out: {
                username: string
                password: string
              }
              _output_in: typeof _trpc_server.unsetMarker
              _output_out: typeof _trpc_server.unsetMarker
            },
            {
              user: Omit<
                {
                  id: number
                  username: string
                  email: string | null
                  image: string | null
                  hashedPassword: string | null
                  hashedRefreshToken: string | null
                  tenantId: number
                  tenant: {
                    name: string
                  }
                  orderProfile: {
                    productType: _yalc__prisma_client_flowda.ProductType
                    plan: number | null
                    amount: number | null
                    expireAt: Date | null
                  } | null
                  weixinProfile: {
                    unionid: string | null
                    loginOpenid: string | null
                    headimgurl: string | null
                    nickname: string | null
                    sex: number | null
                  } | null
                },
                'hashedPassword' | 'hashedRefreshToken'
              >
              rt: {
                token: string
                iat: number
                exp: number
              }
              at: {
                token: string
                iat: number
                exp: number
              }
            }
          >
          createRoot: _trpc_server.BuildProcedure<
            'query',
            {
              _config: _trpc_server.RootConfig<{
                ctx: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >
                  res: express.Response<any, Record<string, any>>
                  requestId: string
                  _diagnosis: any[]
                  user: _flowda_types.ctxUserSchemaDto | undefined
                  tenant: _flowda_types.ctxTenantSchemaDto | undefined
                }
                meta: object
                errorShape: _trpc_server.DefaultErrorShape
                transformer: {
                  input: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                  output: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                }
              }>
              _meta: object
              _ctx_out: {
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >
                res: express.Response<any, Record<string, any>>
                requestId: string
                _diagnosis: any[]
                user: _flowda_types.ctxUserSchemaDto | undefined
                tenant: _flowda_types.ctxTenantSchemaDto | undefined
              }
              _input_in: any
              _input_out: any
              _output_in: typeof _trpc_server.unsetMarker
              _output_out: typeof _trpc_server.unsetMarker
            },
            {
              id: string
              name: string
              visible: boolean
              children: {
                selected: boolean
                expanded: boolean
                children: never[]
                id: string
                name: string
              }[]
            }
          >
          resolveChildren: _trpc_server.BuildProcedure<
            'query',
            {
              _config: _trpc_server.RootConfig<{
                ctx: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >
                  res: express.Response<any, Record<string, any>>
                  requestId: string
                  _diagnosis: any[]
                  user: _flowda_types.ctxUserSchemaDto | undefined
                  tenant: _flowda_types.ctxTenantSchemaDto | undefined
                }
                meta: object
                errorShape: _trpc_server.DefaultErrorShape
                transformer: {
                  input: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                  output: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                }
              }>
              _meta: object
              _ctx_out: {
                user: _flowda_types.ctxUserSchemaDto | undefined
                requestId: string
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >
                res: express.Response<any, Record<string, any>>
                _diagnosis: any[]
                tenant: _flowda_types.ctxTenantSchemaDto | undefined
              }
              _input_in: {
                pid: string
              }
              _input_out: {
                pid: string
              }
              _output_in: typeof _trpc_server.unsetMarker
              _output_out: typeof _trpc_server.unsetMarker
            },
            | {
                id: string
                name: string
                selected: boolean
                uri: string | undefined
                expanded: boolean | undefined
                children: never[] | undefined
              }[]
            | undefined
          >
          getResourceSchema: _trpc_server.BuildProcedure<
            'query',
            {
              _config: _trpc_server.RootConfig<{
                ctx: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >
                  res: express.Response<any, Record<string, any>>
                  requestId: string
                  _diagnosis: any[]
                  user: _flowda_types.ctxUserSchemaDto | undefined
                  tenant: _flowda_types.ctxTenantSchemaDto | undefined
                }
                meta: object
                errorShape: _trpc_server.DefaultErrorShape
                transformer: {
                  input: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                  output: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                }
              }>
              _meta: object
              _ctx_out: {
                user: _flowda_types.ctxUserSchemaDto | undefined
                requestId: string
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >
                res: express.Response<any, Record<string, any>>
                _diagnosis: any[]
                tenant: _flowda_types.ctxTenantSchemaDto | undefined
              }
              _input_in: {
                schemaName: string
              }
              _input_out: {
                schemaName: string
              }
              _output_in: typeof _trpc_server.unsetMarker
              _output_out: typeof _trpc_server.unsetMarker
            },
            any
          >
          getResourceData: _trpc_server.BuildProcedure<
            'query',
            {
              _config: _trpc_server.RootConfig<{
                ctx: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >
                  res: express.Response<any, Record<string, any>>
                  requestId: string
                  _diagnosis: any[]
                  user: _flowda_types.ctxUserSchemaDto | undefined
                  tenant: _flowda_types.ctxTenantSchemaDto | undefined
                }
                meta: object
                errorShape: _trpc_server.DefaultErrorShape
                transformer: {
                  input: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                  output: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                }
              }>
              _meta: object
              _ctx_out: {
                user: _flowda_types.ctxUserSchemaDto | undefined
                requestId: string
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >
                res: express.Response<any, Record<string, any>>
                _diagnosis: any[]
                tenant: _flowda_types.ctxTenantSchemaDto | undefined
              }
              _input_in:
                | {
                    sort: {
                      sort: 'asc' | 'desc'
                      colId: string
                    }[]
                    schemaName: string
                    current: number
                    pageSize: number
                    filterModel: Record<
                      string,
                      | {
                          filterType: 'number' | 'text'
                          filter: string | number
                          type: 'contains' | 'equals'
                        }
                      | {
                          filterType: 'text'
                          operator: 'OR' | 'AND'
                          conditions: {
                            filterType: 'number' | 'text'
                            filter: string | number
                            type: 'contains' | 'equals'
                          }[]
                        }
                    >
                  }
                | {
                    schemaName: string
                    id: number
                  }
              _input_out:
                | {
                    sort: {
                      sort: 'asc' | 'desc'
                      colId: string
                    }[]
                    schemaName: string
                    current: number
                    pageSize: number
                    filterModel: Record<
                      string,
                      | {
                          filterType: 'number' | 'text'
                          filter: string | number
                          type: 'contains' | 'equals'
                        }
                      | {
                          filterType: 'text'
                          operator: 'OR' | 'AND'
                          conditions: {
                            filterType: 'number' | 'text'
                            filter: string | number
                            type: 'contains' | 'equals'
                          }[]
                        }
                    >
                  }
                | {
                    schemaName: string
                    id: number
                  }
              _output_in: typeof _trpc_server.unsetMarker
              _output_out: typeof _trpc_server.unsetMarker
            },
            any
          >
          putResourceData: _trpc_server.BuildProcedure<
            'mutation',
            {
              _config: _trpc_server.RootConfig<{
                ctx: {
                  req: express.Request<
                    express_serve_static_core.ParamsDictionary,
                    any,
                    any,
                    qs.ParsedQs,
                    Record<string, any>
                  >
                  res: express.Response<any, Record<string, any>>
                  requestId: string
                  _diagnosis: any[]
                  user: _flowda_types.ctxUserSchemaDto | undefined
                  tenant: _flowda_types.ctxTenantSchemaDto | undefined
                }
                meta: object
                errorShape: _trpc_server.DefaultErrorShape
                transformer: {
                  input: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                  output: {
                    serialize: (object: any) => any
                    deserialize: (object: any) => any
                  }
                }
              }>
              _meta: object
              _ctx_out: {
                user: _flowda_types.ctxUserSchemaDto | undefined
                requestId: string
                req: express.Request<
                  express_serve_static_core.ParamsDictionary,
                  any,
                  any,
                  qs.ParsedQs,
                  Record<string, any>
                >
                res: express.Response<any, Record<string, any>>
                _diagnosis: any[]
                tenant: _flowda_types.ctxTenantSchemaDto | undefined
              }
              _input_in: {
                id: number
                schemaName: string
                updatedValue?: any
              }
              _input_out: {
                id: number
                schemaName: string
                updatedValue?: any
              }
              _output_in: typeof _trpc_server.unsetMarker
              _output_out: typeof _trpc_server.unsetMarker
            },
            any
          >
        }
      >
    }
  >
  applyMiddleware(app: INestApplication, globalPrefix: string): void
}
type AppRouter = TrpcRouter[`appRouter`]

declare const FLOWDA_GATEWAY_ENV: znv_dist_util.DeepReadonlyObject<{
  ACCESS_TOKEN_SECRET: string
  FLOWDA_URL: string
  CMS_ADMIN_URL: string
  YONGCHENG_URL: string
}>

export { type AppRouter, FLOWDA_GATEWAY_ENV, TrpcRouter, flowdaGatewayTrpcServerModule }
