import { ContainerModule } from 'inversify';
import * as _prisma_client_flowda from '@prisma/client-flowda';
import * as _trpc_server from '@trpc/server';
import { ZodTypeDef, ZodSchema, z } from 'zod';
import * as express from 'express';
import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';
import * as _flowda_projects_flowda_shared_types from '@flowda-projects/flowda-shared-types';
import { LoggerService, INestApplication } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as znv_dist_util from 'znv/dist/util';

declare const flowdaGatewayTrpcServerModule: ContainerModule;

interface ZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput> {
    new (): TOutput;
    isZodDto: true;
    schema: ZodSchema<TOutput, TDef, TInput>;
    create(input: unknown): TOutput;
}

declare const ctxTenantSchemaDto_base: ZodDto<{
    name: string;
    id: number;
}, z.ZodObjectDef<{
    id: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    name: string;
    id: number;
}>;
declare class ctxTenantSchemaDto extends ctxTenantSchemaDto_base {
}
declare const ctxUserSchemaDto_base: ZodDto<{
    username: string;
    tenantId: number;
    id: number;
}, z.ZodObjectDef<{
    id: z.ZodNumber;
    tenantId: z.ZodNumber;
    username: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    username: string;
    tenantId: number;
    id: number;
}>;
declare class ctxUserSchemaDto extends ctxUserSchemaDto_base {
}

declare class TrpcService {
    private readonly logger;
    constructor(loggerFactory: (name: string) => LoggerService);
    trpc: {
        _config: _trpc_server.RootConfig<{
            ctx: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: {
                input: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
                output: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
            };
        }>;
        procedure: _trpc_server.ProcedureBuilder<{
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: typeof _trpc_server.unsetMarker;
            _input_out: typeof _trpc_server.unsetMarker;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
            _meta: object;
        }>;
        middleware: <TNewParams extends _trpc_server.ProcedureParams<_trpc_server.AnyRootConfig, unknown, unknown, unknown, unknown, unknown, unknown>>(fn: _trpc_server.MiddlewareFunction<{
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _ctx_out: {};
            _input_out: typeof _trpc_server.unsetMarker;
            _input_in: unknown;
            _output_in: unknown;
            _output_out: unknown;
            _meta: object;
        }, TNewParams>) => _trpc_server.MiddlewareBuilder<{
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _ctx_out: {};
            _input_out: typeof _trpc_server.unsetMarker;
            _input_in: unknown;
            _output_in: unknown;
            _output_out: unknown;
            _meta: object;
        }, TNewParams>;
        router: <TProcRouterRecord extends _trpc_server.ProcedureRouterRecord>(procedures: TProcRouterRecord) => _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: {
                input: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
                output: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
            };
        }>, TProcRouterRecord>;
        mergeRouters: typeof _trpc_server.mergeRouters;
    };
    procedure: _trpc_server.ProcedureBuilder<{
        _config: _trpc_server.RootConfig<{
            ctx: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: {
                input: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
                output: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
            };
        }>;
        _ctx_out: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
        _meta: object;
    }>;
    protectedProcedure: _trpc_server.ProcedureBuilder<{
        _config: _trpc_server.RootConfig<{
            ctx: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: {
                input: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
                output: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
            };
        }>;
        _meta: object;
        _ctx_out: {
            user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
            requestId: string;
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            _diagnosis: any[];
            tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
        };
        _input_in: typeof _trpc_server.unsetMarker;
        _input_out: typeof _trpc_server.unsetMarker;
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
    }>;
    router: <TProcRouterRecord extends _trpc_server.ProcedureRouterRecord>(procedures: TProcRouterRecord) => _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, TProcRouterRecord>;
    mergeRouters: typeof _trpc_server.mergeRouters;
}

declare class ContextFactory {
    private readonly logger;
    constructor(loggerFactory: (name: string) => LoggerService);
    createContext: (opts: trpcExpress.CreateExpressContextOptions) => Promise<{
        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
        res: express.Response<any, Record<string, any>>;
        requestId: string;
        _diagnosis: any[];
        user: ctxUserSchemaDto | undefined;
        tenant: ctxTenantSchemaDto | undefined;
    }>;
}

declare class HelloRouter {
    private trpc;
    private readonly logger;
    constructor(trpc: TrpcService, loggerFactory: (name: string) => LoggerService);
    helloRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
            tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, {
        validate: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                username: string;
                password: string;
            };
            _input_out: {
                username: string;
                password: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            user: Omit<{
                id: number;
                username: string;
                email: string | null;
                image: string | null;
                hashedPassword: string | null;
                hashedRefreshToken: string | null;
                tenantId: number;
                tenant: {
                    name: string;
                };
                orderProfile: {
                    productType: _prisma_client_flowda.ProductType;
                    plan: number | null;
                    amount: number | null;
                    expireAt: Date | null;
                } | null;
                weixinProfile: {
                    unionid: string | null;
                    loginOpenid: string | null;
                    headimgurl: string | null;
                    nickname: string | null;
                    sex: number | null;
                } | null;
            }, "hashedPassword" | "hashedRefreshToken">;
            rt: {
                token: string;
                iat: number;
                exp: number;
            };
            at: {
                token: string;
                iat: number;
                exp: number;
            };
        }>;
        createRoot: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: any;
            _input_out: any;
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            id: string;
            name: string;
            visible: boolean;
            children: {
                id: string;
                name: string;
                selected: boolean;
                expanded: boolean;
                children: never[];
            }[];
        }>;
        resolveChildren: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                requestId: string;
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                _diagnosis: any[];
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                pid: string;
            };
            _input_out: {
                pid: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            id: string;
            name: string;
            selected: boolean;
            uri: {
                scheme: string;
                name: string;
            } | undefined;
            expanded: boolean | undefined;
            children: never[] | undefined;
        }[] | {
            id: string;
            name: string;
            selected: boolean;
            uri: {
                scheme: string;
                name: string;
            };
        }[] | undefined>;
        getResourceSchema: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                requestId: string;
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                _diagnosis: any[];
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                schemaName: string;
            };
            _input_out: {
                schemaName: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, {
            custom?: any;
            prisma?: boolean | undefined;
            display_column?: string | string[] | undefined;
            namespace?: string | undefined;
            is_dynamic?: boolean | undefined;
            searchable_columns?: string[] | undefined;
            __jsonschema?: any;
            primary_key: string;
            name: string;
            slug: string;
            display_name: string | null;
            schema_name: string;
            display_primary_key: boolean;
            columns: {
                format?: {
                    select_options: {
                        value: string | number;
                        label: string;
                    }[];
                } | undefined;
                display_name?: string | undefined;
                access_type?: "read_only" | undefined;
                prisma?: boolean | undefined;
                name: string;
                column_type: "string" | "boolean" | "datetime" | "integer" | "reference" | "tag" | "textarea";
                reference: {
                    display_column?: string | string[] | undefined;
                    'x-unique'?: boolean | undefined;
                    model_name: string;
                    primary_key: string;
                    display_name: string;
                    'x-relationField': string;
                    'x-onSoftDelete': string;
                };
                validators: ({
                    required: boolean;
                } | {
                    message: string;
                    format: string;
                })[];
            }[];
            associations: {
                foreign_key: string;
                model_name: string;
                primary_key: string;
                name: string;
                slug: string;
                display_name: string;
                schema_name: string;
            }[];
        }>;
        getResourceData: _trpc_server.BuildProcedure<"query", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                requestId: string;
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                _diagnosis: any[];
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                id?: number | undefined;
                sort: {
                    sort: "asc" | "desc";
                    colId: string;
                }[];
                schemaName: string;
                current: number;
                pageSize: number;
                filterModel: {
                    _ref?: string | undefined;
                } | Record<string, {
                    filter: string | number;
                    type: "contains" | "equals";
                    filterType: "number" | "text";
                } | {
                    filterType: "text";
                    operator: "OR" | "AND";
                    conditions: {
                        filter: string | number;
                        type: "contains" | "equals";
                        filterType: "number" | "text";
                    }[];
                }>;
            };
            _input_out: {
                id?: number | undefined;
                sort: {
                    sort: "asc" | "desc";
                    colId: string;
                }[];
                schemaName: string;
                current: number;
                pageSize: number;
                filterModel: {
                    _ref?: string | undefined;
                } | Record<string, {
                    filter: string | number;
                    type: "contains" | "equals";
                    filterType: "number" | "text";
                } | {
                    filterType: "text";
                    operator: "OR" | "AND";
                    conditions: {
                        filter: string | number;
                        type: "contains" | "equals";
                        filterType: "number" | "text";
                    }[];
                }>;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
        putResourceData: _trpc_server.BuildProcedure<"mutation", {
            _config: _trpc_server.RootConfig<{
                ctx: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                    tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
                };
                meta: object;
                errorShape: _trpc_server.DefaultErrorShape;
                transformer: {
                    input: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                    output: {
                        serialize: (object: any) => any;
                        deserialize: (object: any) => any;
                    };
                };
            }>;
            _meta: object;
            _ctx_out: {
                user: _flowda_projects_flowda_shared_types.ctxUserSchemaDto | undefined;
                requestId: string;
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                _diagnosis: any[];
                tenant: _flowda_projects_flowda_shared_types.ctxTenantSchemaDto | undefined;
            };
            _input_in: {
                updatedValue?: any;
                id: number;
                schemaName: string;
            };
            _input_out: {
                updatedValue?: any;
                id: number;
                schemaName: string;
            };
            _output_in: typeof _trpc_server.unsetMarker;
            _output_out: typeof _trpc_server.unsetMarker;
        }, any>;
    }>;
}

declare class TrpcRouter {
    private trpc;
    private helloRouter;
    private contextFactory;
    private readonly logger;
    constructor(trpc: TrpcService, helloRouter: HelloRouter, contextFactory: ContextFactory, loggerFactory: (name: string) => LoggerService);
    appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
        ctx: {
            req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express.Response<any, Record<string, any>>;
            requestId: string;
            _diagnosis: any[];
            user: ctxUserSchemaDto | undefined;
            tenant: ctxTenantSchemaDto | undefined;
        };
        meta: object;
        errorShape: _trpc_server.DefaultErrorShape;
        transformer: {
            input: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
            output: {
                serialize: (object: any) => any;
                deserialize: (object: any) => any;
            };
        };
    }>, {
        hello: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
            ctx: {
                req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express.Response<any, Record<string, any>>;
                requestId: string;
                _diagnosis: any[];
                user: ctxUserSchemaDto | undefined;
                tenant: ctxTenantSchemaDto | undefined;
            };
            meta: object;
            errorShape: _trpc_server.DefaultErrorShape;
            transformer: {
                input: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
                output: {
                    serialize: (object: any) => any;
                    deserialize: (object: any) => any;
                };
            };
        }>, {
            validate: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: {
                        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                        res: express.Response<any, Record<string, any>>;
                        requestId: string;
                        _diagnosis: any[];
                        user: ctxUserSchemaDto | undefined;
                        tenant: ctxTenantSchemaDto | undefined;
                    };
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: {
                        input: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                        output: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                    };
                }>;
                _meta: object;
                _ctx_out: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: ctxUserSchemaDto | undefined;
                    tenant: ctxTenantSchemaDto | undefined;
                };
                _input_in: {
                    username: string;
                    password: string;
                };
                _input_out: {
                    username: string;
                    password: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                user: Omit<{
                    id: number;
                    username: string;
                    email: string | null;
                    image: string | null;
                    hashedPassword: string | null;
                    hashedRefreshToken: string | null;
                    tenantId: number;
                    tenant: {
                        name: string;
                    };
                    orderProfile: {
                        productType: _prisma_client_flowda.ProductType;
                        plan: number | null;
                        amount: number | null;
                        expireAt: Date | null;
                    } | null;
                    weixinProfile: {
                        unionid: string | null;
                        loginOpenid: string | null;
                        headimgurl: string | null;
                        nickname: string | null;
                        sex: number | null;
                    } | null;
                }, "hashedPassword" | "hashedRefreshToken">;
                rt: {
                    token: string;
                    iat: number;
                    exp: number;
                };
                at: {
                    token: string;
                    iat: number;
                    exp: number;
                };
            }>;
            createRoot: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: {
                        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                        res: express.Response<any, Record<string, any>>;
                        requestId: string;
                        _diagnosis: any[];
                        user: ctxUserSchemaDto | undefined;
                        tenant: ctxTenantSchemaDto | undefined;
                    };
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: {
                        input: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                        output: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                    };
                }>;
                _meta: object;
                _ctx_out: {
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    requestId: string;
                    _diagnosis: any[];
                    user: ctxUserSchemaDto | undefined;
                    tenant: ctxTenantSchemaDto | undefined;
                };
                _input_in: any;
                _input_out: any;
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                id: string;
                name: string;
                visible: boolean;
                children: {
                    id: string;
                    name: string;
                    selected: boolean;
                    expanded: boolean;
                    children: never[];
                }[];
            }>;
            resolveChildren: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: {
                        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                        res: express.Response<any, Record<string, any>>;
                        requestId: string;
                        _diagnosis: any[];
                        user: ctxUserSchemaDto | undefined;
                        tenant: ctxTenantSchemaDto | undefined;
                    };
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: {
                        input: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                        output: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                    };
                }>;
                _meta: object;
                _ctx_out: {
                    user: ctxUserSchemaDto | undefined;
                    requestId: string;
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    _diagnosis: any[];
                    tenant: ctxTenantSchemaDto | undefined;
                };
                _input_in: {
                    pid: string;
                };
                _input_out: {
                    pid: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                id: string;
                name: string;
                selected: boolean;
                uri: {
                    scheme: string;
                    name: string;
                } | undefined;
                expanded: boolean | undefined;
                children: never[] | undefined;
            }[] | {
                id: string;
                name: string;
                selected: boolean;
                uri: {
                    scheme: string;
                    name: string;
                };
            }[] | undefined>;
            getResourceSchema: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: {
                        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                        res: express.Response<any, Record<string, any>>;
                        requestId: string;
                        _diagnosis: any[];
                        user: ctxUserSchemaDto | undefined;
                        tenant: ctxTenantSchemaDto | undefined;
                    };
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: {
                        input: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                        output: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                    };
                }>;
                _meta: object;
                _ctx_out: {
                    user: ctxUserSchemaDto | undefined;
                    requestId: string;
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    _diagnosis: any[];
                    tenant: ctxTenantSchemaDto | undefined;
                };
                _input_in: {
                    schemaName: string;
                };
                _input_out: {
                    schemaName: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, {
                custom?: any;
                prisma?: boolean | undefined;
                display_column?: string | string[] | undefined;
                namespace?: string | undefined;
                is_dynamic?: boolean | undefined;
                searchable_columns?: string[] | undefined;
                __jsonschema?: any;
                primary_key: string;
                name: string;
                slug: string;
                display_name: string | null;
                schema_name: string;
                display_primary_key: boolean;
                columns: {
                    format?: {
                        select_options: {
                            value: string | number;
                            label: string;
                        }[];
                    } | undefined;
                    display_name?: string | undefined;
                    access_type?: "read_only" | undefined;
                    prisma?: boolean | undefined;
                    name: string;
                    column_type: "string" | "boolean" | "datetime" | "integer" | "reference" | "tag" | "textarea";
                    reference: {
                        display_column?: string | string[] | undefined;
                        'x-unique'?: boolean | undefined;
                        model_name: string;
                        primary_key: string;
                        display_name: string;
                        'x-relationField': string;
                        'x-onSoftDelete': string;
                    };
                    validators: ({
                        required: boolean;
                    } | {
                        message: string;
                        format: string;
                    })[];
                }[];
                associations: {
                    foreign_key: string;
                    model_name: string;
                    primary_key: string;
                    name: string;
                    slug: string;
                    display_name: string;
                    schema_name: string;
                }[];
            }>;
            getResourceData: _trpc_server.BuildProcedure<"query", {
                _config: _trpc_server.RootConfig<{
                    ctx: {
                        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                        res: express.Response<any, Record<string, any>>;
                        requestId: string;
                        _diagnosis: any[];
                        user: ctxUserSchemaDto | undefined;
                        tenant: ctxTenantSchemaDto | undefined;
                    };
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: {
                        input: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                        output: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                    };
                }>;
                _meta: object;
                _ctx_out: {
                    user: ctxUserSchemaDto | undefined;
                    requestId: string;
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    _diagnosis: any[];
                    tenant: ctxTenantSchemaDto | undefined;
                };
                _input_in: {
                    id?: number | undefined;
                    sort: {
                        sort: "asc" | "desc";
                        colId: string;
                    }[];
                    schemaName: string;
                    current: number;
                    pageSize: number;
                    filterModel: {
                        _ref?: string | undefined;
                    } | Record<string, {
                        filter: string | number;
                        type: "contains" | "equals";
                        filterType: "number" | "text";
                    } | {
                        filterType: "text";
                        operator: "OR" | "AND";
                        conditions: {
                            filter: string | number;
                            type: "contains" | "equals";
                            filterType: "number" | "text";
                        }[];
                    }>;
                };
                _input_out: {
                    id?: number | undefined;
                    sort: {
                        sort: "asc" | "desc";
                        colId: string;
                    }[];
                    schemaName: string;
                    current: number;
                    pageSize: number;
                    filterModel: {
                        _ref?: string | undefined;
                    } | Record<string, {
                        filter: string | number;
                        type: "contains" | "equals";
                        filterType: "number" | "text";
                    } | {
                        filterType: "text";
                        operator: "OR" | "AND";
                        conditions: {
                            filter: string | number;
                            type: "contains" | "equals";
                            filterType: "number" | "text";
                        }[];
                    }>;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, any>;
            putResourceData: _trpc_server.BuildProcedure<"mutation", {
                _config: _trpc_server.RootConfig<{
                    ctx: {
                        req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                        res: express.Response<any, Record<string, any>>;
                        requestId: string;
                        _diagnosis: any[];
                        user: ctxUserSchemaDto | undefined;
                        tenant: ctxTenantSchemaDto | undefined;
                    };
                    meta: object;
                    errorShape: _trpc_server.DefaultErrorShape;
                    transformer: {
                        input: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                        output: {
                            serialize: (object: any) => any;
                            deserialize: (object: any) => any;
                        };
                    };
                }>;
                _meta: object;
                _ctx_out: {
                    user: ctxUserSchemaDto | undefined;
                    requestId: string;
                    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                    res: express.Response<any, Record<string, any>>;
                    _diagnosis: any[];
                    tenant: ctxTenantSchemaDto | undefined;
                };
                _input_in: {
                    updatedValue?: any;
                    id: number;
                    schemaName: string;
                };
                _input_out: {
                    updatedValue?: any;
                    id: number;
                    schemaName: string;
                };
                _output_in: typeof _trpc_server.unsetMarker;
                _output_out: typeof _trpc_server.unsetMarker;
            }, any>;
        }>;
    }>;
    applyMiddleware(app: INestApplication, globalPrefix: string): void;
}
type AppRouter = TrpcRouter[`appRouter`];

declare const FLOWDA_GATEWAY_ENV: znv_dist_util.DeepReadonlyObject<{
    ACCESS_TOKEN_SECRET: string;
    FLOWDA_URL: string;
    CMS_ADMIN_URL: string;
}>;

export { type AppRouter, FLOWDA_GATEWAY_ENV, TrpcRouter, flowdaGatewayTrpcServerModule };
