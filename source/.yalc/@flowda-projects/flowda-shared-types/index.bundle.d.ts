import { ZodTypeDef, ZodSchema, z } from 'zod';

declare const PrismaSchemaServiceSymbol: unique symbol;
declare const SchemaTransformerSymbol: unique symbol;
declare const PrismaUtilsSymbol: unique symbol;
declare const DataServiceSymbol: unique symbol;
declare const SchemaServiceSymbol: unique symbol;
declare const DynamicTableSchemaTransformerSymbol: unique symbol;
declare const FlowdaTrpcClientSymbol: unique symbol;
declare const FlowdaGatewayTrpcClientSymbol: unique symbol;
declare const PrismaClientSymbol: unique symbol;
/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
declare const ServiceSymbol: unique symbol;
declare const APISymbol: unique symbol;
declare const URLSymbol: unique symbol;
declare const ENVSymbol: unique symbol;
declare const PrismaZodSchemaSymbol: unique symbol;
declare const CustomZodSchemaSymbol: unique symbol;
declare const K3CloudIdentifyInfoSymbol: unique symbol;
declare const COSSymbol: unique symbol;
declare const SmsClientSymbol: unique symbol;
declare const WechatOAuthSymbol: unique symbol;
declare const DynamicTableDataServiceSymbol: unique symbol;
declare const DynamicTableDefServiceSymbol: unique symbol;
declare const MenuServiceSymbol: unique symbol;
declare const WechatpayNodeV3Symbol: unique symbol;
declare const WechatpayNodeV3FactorySymbol: unique symbol;
declare const GridModelSymbol: unique symbol;
declare const LoginModelSymbol: unique symbol;

type TFilterFormValue = string | {
    column: string | undefined;
    condition: string | undefined;
    value: string | undefined;
};
declare enum EPlan {
    Free = 1,
    VIP = 2
}
declare const Serial_Min = 10001;
declare const Serial_Max = 99999;
type TCtx = {
    _diagnosis: any[];
};

interface ZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput> {
    new (): TOutput;
    isZodDto: true;
    schema: ZodSchema<TOutput, TDef, TInput>;
    create(input: unknown): TOutput;
}
declare function createZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput>(schema: ZodSchema<TOutput, TDef, TInput>): ZodDto<TOutput, TDef, TInput>;

declare const selectOptionSchema: z.ZodObject<{
    value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string | number;
    label: string;
}, {
    value: string | number;
    label: string;
}>;
declare const resourceAssociationSchema: z.ZodObject<{
    foreign_key: z.ZodString;
    model_name: z.ZodString;
    primary_key: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    display_name: z.ZodString;
    schema_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    foreign_key: string;
    model_name: string;
    primary_key: string;
    name: string;
    slug: string;
    display_name: string;
    schema_name: string;
}, {
    foreign_key: string;
    model_name: string;
    primary_key: string;
    name: string;
    slug: string;
    display_name: string;
    schema_name: string;
}>;
declare const resourceColumnSchema: z.ZodObject<{
    name: z.ZodString;
    access_type: z.ZodOptional<z.ZodEnum<["read_only"]>>;
    column_type: z.ZodEnum<["reference", "string", "tag", "integer", "datetime", "textarea", "boolean"]>;
    prisma: z.ZodOptional<z.ZodBoolean>;
    format: z.ZodOptional<z.ZodObject<{
        select_options: z.ZodArray<z.ZodObject<{
            value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string | number;
            label: string;
        }, {
            value: string | number;
            label: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        select_options: {
            value: string | number;
            label: string;
        }[];
    }, {
        select_options: {
            value: string | number;
            label: string;
        }[];
    }>>;
    reference: z.ZodObject<{
        model_name: z.ZodString;
        primary_key: z.ZodString;
        display_name: z.ZodString;
        display_column: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
        'x-relationField': z.ZodString;
        'x-onSoftDelete': z.ZodString;
        'x-unique': z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
    }, {
        display_column?: string | string[] | undefined;
        'x-unique'?: boolean | undefined;
        model_name: string;
        primary_key: string;
        display_name: string;
        'x-relationField': string;
        'x-onSoftDelete': string;
    }>;
    display_name: z.ZodOptional<z.ZodString>;
    validators: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        required: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        required: boolean;
    }, {
        required: boolean;
    }>, z.ZodObject<{
        format: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        format: string;
    }, {
        message: string;
        format: string;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    display_name?: string | undefined;
    access_type?: "read_only" | undefined;
    prisma?: boolean | undefined;
    format?: {
        select_options: {
            value: string | number;
            label: string;
        }[];
    } | undefined;
    name: string;
    column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
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
}, {
    display_name?: string | undefined;
    access_type?: "read_only" | undefined;
    prisma?: boolean | undefined;
    format?: {
        select_options: {
            value: string | number;
            label: string;
        }[];
    } | undefined;
    name: string;
    column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
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
}>;
declare const resourceSchema: z.ZodObject<{
    namespace: z.ZodOptional<z.ZodString>;
    prisma: z.ZodOptional<z.ZodBoolean>;
    is_dynamic: z.ZodOptional<z.ZodBoolean>;
    schema_name: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    primary_key: z.ZodString;
    custom: z.ZodAny;
    display_column: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
    display_name: z.ZodNullable<z.ZodString>;
    display_primary_key: z.ZodBoolean;
    searchable_columns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    columns: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        access_type: z.ZodOptional<z.ZodEnum<["read_only"]>>;
        column_type: z.ZodEnum<["reference", "string", "tag", "integer", "datetime", "textarea", "boolean"]>;
        prisma: z.ZodOptional<z.ZodBoolean>;
        format: z.ZodOptional<z.ZodObject<{
            select_options: z.ZodArray<z.ZodObject<{
                value: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                label: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string | number;
                label: string;
            }, {
                value: string | number;
                label: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            select_options: {
                value: string | number;
                label: string;
            }[];
        }, {
            select_options: {
                value: string | number;
                label: string;
            }[];
        }>>;
        reference: z.ZodObject<{
            model_name: z.ZodString;
            primary_key: z.ZodString;
            display_name: z.ZodString;
            display_column: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
            'x-relationField': z.ZodString;
            'x-onSoftDelete': z.ZodString;
            'x-unique': z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        }, {
            display_column?: string | string[] | undefined;
            'x-unique'?: boolean | undefined;
            model_name: string;
            primary_key: string;
            display_name: string;
            'x-relationField': string;
            'x-onSoftDelete': string;
        }>;
        display_name: z.ZodOptional<z.ZodString>;
        validators: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            required: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            required: boolean;
        }, {
            required: boolean;
        }>, z.ZodObject<{
            format: z.ZodString;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            format: string;
        }, {
            message: string;
            format: string;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
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
    }, {
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
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
    }>, "many">;
    associations: z.ZodArray<z.ZodObject<{
        foreign_key: z.ZodString;
        model_name: z.ZodString;
        primary_key: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        display_name: z.ZodString;
        schema_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        foreign_key: string;
        model_name: string;
        primary_key: string;
        name: string;
        slug: string;
        display_name: string;
        schema_name: string;
    }, {
        foreign_key: string;
        model_name: string;
        primary_key: string;
        name: string;
        slug: string;
        display_name: string;
        schema_name: string;
    }>, "many">;
    __jsonschema: z.ZodAny;
}, "strip", z.ZodTypeAny, {
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
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
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
        display_name?: string | undefined;
        access_type?: "read_only" | undefined;
        prisma?: boolean | undefined;
        format?: {
            select_options: {
                value: string | number;
                label: string;
            }[];
        } | undefined;
        name: string;
        column_type: "string" | "boolean" | "integer" | "reference" | "tag" | "datetime" | "textarea";
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
declare const agFilterInnerSchema: z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}>;
declare const agFilterInner2Schema: z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}>;
declare const agFilter1Schema: z.ZodRecord<z.ZodString, z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}>>;
type TAgFilter1Schema = z.infer<typeof agFilter1Schema>;
declare const agFilter2Schema: z.ZodRecord<z.ZodString, z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}>>;
declare const agFilterSchema: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
    filterType: z.ZodEnum<["text", "number"]>;
    type: z.ZodEnum<["contains", "equals"]>;
    filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}, {
    filter: string | number;
    type: "contains" | "equals";
    filterType: "number" | "text";
}>, z.ZodObject<{
    filterType: z.ZodEnum<["text"]>;
    operator: z.ZodEnum<["OR", "AND"]>;
    conditions: z.ZodArray<z.ZodObject<{
        filterType: z.ZodEnum<["text", "number"]>;
        type: z.ZodEnum<["contains", "equals"]>;
        filter: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }, {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}, {
    filterType: "text";
    operator: "OR" | "AND";
    conditions: {
        filter: string | number;
        type: "contains" | "equals";
        filterType: "number" | "text";
    }[];
}>]>>, z.ZodObject<{
    _ref: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    _ref?: string | undefined;
}, {
    _ref?: string | undefined;
}>]>;
type TAgFilterSchema = z.infer<typeof agFilterSchema>;
declare const agSortSchema: z.ZodArray<z.ZodObject<{
    colId: z.ZodString;
    sort: z.ZodEnum<["asc", "desc"]>;
}, "strip", z.ZodTypeAny, {
    sort: "asc" | "desc";
    colId: string;
}, {
    sort: "asc" | "desc";
    colId: string;
}>, "many">;
type TAgSortSchema = z.infer<typeof agSortSchema>;
declare const prismaFilterSchema: z.ZodObject<{
    OR: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodEnum<["contains"]>, z.ZodString>>, "many">;
}, "strip", z.ZodTypeAny, {
    OR: Record<string, Partial<Record<"contains", string>>>[];
}, {
    OR: Record<string, Partial<Record<"contains", string>>>[];
}>;
type IPrismaFilterSchema = z.infer<typeof prismaFilterSchema>;
type IResourceSchema = z.infer<typeof resourceSchema>;
type IResourceAssociationSchema = z.infer<typeof resourceAssociationSchema>;
type ISchemaSelectOption = z.infer<typeof selectOptionSchema>;
type IResourceColumnSchema = z.infer<typeof resourceColumnSchema>;
declare const registerSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    tenantId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    tenantId: number;
}, {
    username: string;
    password: string;
    tenantId: number;
}>;
declare const RegisterDto_base: ZodDto<{
    username: string;
    password: string;
    tenantId: number;
}, z.ZodObjectDef<{
    username: z.ZodString;
    password: z.ZodString;
    tenantId: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    username: string;
    password: string;
    tenantId: number;
}>;
declare class RegisterDto extends RegisterDto_base {
}
declare const accountExistsSchema: z.ZodObject<{
    username: z.ZodString;
    tenantName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    tenantName: string;
}, {
    username: string;
    tenantName: string;
}>;
declare const AccountExistsSchemaDto_base: ZodDto<{
    username: string;
    tenantName: string;
}, z.ZodObjectDef<{
    username: z.ZodString;
    tenantName: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    username: string;
    tenantName: string;
}>;
declare class AccountExistsSchemaDto extends AccountExistsSchemaDto_base {
}
declare const validateSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
declare const validateSchemaDto_base: ZodDto<{
    username: string;
    password: string;
}, z.ZodObjectDef<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    username: string;
    password: string;
}>;
declare class validateSchemaDto extends validateSchemaDto_base {
}
declare const getTenantByNameSchema: z.ZodObject<{
    tenantName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tenantName: string;
}, {
    tenantName: string;
}>;
declare const GetTenantByNameSchemaDto_base: ZodDto<{
    tenantName: string;
}, z.ZodObjectDef<{
    tenantName: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    tenantName: string;
}>;
declare class GetTenantByNameSchemaDto extends GetTenantByNameSchemaDto_base {
}
declare const findByUnionIdAndTenantIdSchema: z.ZodObject<{
    unionid: z.ZodString;
    tenantId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    tenantId: number;
    unionid: string;
}, {
    tenantId: number;
    unionid: string;
}>;
declare const FindByUnionIdAndTenantIdSchemaDto_base: ZodDto<{
    tenantId: number;
    unionid: string;
}, z.ZodObjectDef<{
    unionid: z.ZodString;
    tenantId: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    tenantId: number;
    unionid: string;
}>;
declare class FindByUnionIdAndTenantIdSchemaDto extends FindByUnionIdAndTenantIdSchemaDto_base {
}
declare const registerByUnionIdSchema: z.ZodObject<{
    unionid: z.ZodString;
    tenantId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    tenantId: number;
    unionid: string;
}, {
    tenantId: number;
    unionid: string;
}>;
declare const RegisterByUnionIdSchemaDto_base: ZodDto<{
    tenantId: number;
    unionid: string;
}, z.ZodObjectDef<{
    unionid: z.ZodString;
    tenantId: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    tenantId: number;
    unionid: string;
}>;
declare class RegisterByUnionIdSchemaDto extends RegisterByUnionIdSchemaDto_base {
}
declare const resetPasswordSchema: z.ZodObject<{
    userId: z.ZodNumber;
    tenantId: z.ZodNumber;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    tenantId: number;
    userId: number;
}, {
    password: string;
    tenantId: number;
    userId: number;
}>;
declare const resetPasswordSchemaDto_base: ZodDto<{
    password: string;
    tenantId: number;
    userId: number;
}, z.ZodObjectDef<{
    userId: z.ZodNumber;
    tenantId: z.ZodNumber;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    password: string;
    tenantId: number;
    userId: number;
}>;
declare class resetPasswordSchemaDto extends resetPasswordSchemaDto_base {
}
declare const verifyMobileSchema: z.ZodObject<{
    uid: z.ZodNumber;
    tid: z.ZodNumber;
    mobile: z.ZodString;
    code: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    slug: string;
    uid: number;
    tid: number;
    mobile: string;
}, {
    code: string;
    slug: string;
    uid: number;
    tid: number;
    mobile: string;
}>;
declare const verifyMobileSchemaDto_base: ZodDto<{
    code: string;
    slug: string;
    uid: number;
    tid: number;
    mobile: string;
}, z.ZodObjectDef<{
    uid: z.ZodNumber;
    tid: z.ZodNumber;
    mobile: z.ZodString;
    code: z.ZodString;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    code: string;
    slug: string;
    uid: number;
    tid: number;
    mobile: string;
}>;
declare class verifyMobileSchemaDto extends verifyMobileSchemaDto_base {
}
declare const tenantJwtPayloadSchema: z.ZodObject<{
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    tid: number;
}, {
    tid: number;
}>;
declare const userJwtPayloadSchema: z.ZodObject<{
    uid: z.ZodNumber;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    uid: number;
    tid: number;
}, {
    uid: number;
    tid: number;
}>;
declare const userJwtPayloadSchemaDto_base: ZodDto<{
    uid: number;
    tid: number;
}, z.ZodObjectDef<{
    uid: z.ZodNumber;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    uid: number;
    tid: number;
}>;
declare class userJwtPayloadSchemaDto extends userJwtPayloadSchemaDto_base {
}
declare const customerPreSignupSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const customerPreSignupSchemaDto_base: ZodDto<{
    email: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
}>;
declare class customerPreSignupSchemaDto extends customerPreSignupSchemaDto_base {
}
declare const customerPreSignupTenantJwtPayloadSchemaDto_base: ZodDto<{
    email: string;
    tid: number;
}, z.ZodObjectDef<{
    email: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    email: string;
    tid: number;
}>;
declare class customerPreSignupTenantJwtPayloadSchemaDto extends customerPreSignupTenantJwtPayloadSchemaDto_base {
}
declare const customerSignupSchema: z.ZodObject<{
    email: z.ZodString;
    verifyCode: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    verifyCode: string;
}, {
    email: string;
    password: string;
    verifyCode: string;
}>;
declare const customerSignupSchemaDto_base: ZodDto<{
    email: string;
    password: string;
    verifyCode: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
    verifyCode: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
    password: string;
    verifyCode: string;
}>;
declare class customerSignupSchemaDto extends customerSignupSchemaDto_base {
}
declare const customerSignupTenantJwtPayloadSchemaDto_base: ZodDto<{
    email: string;
    password: string;
    tid: number;
    verifyCode: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
    password: z.ZodString;
    verifyCode: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    email: string;
    password: string;
    tid: number;
    verifyCode: string;
}>;
declare class customerSignupTenantJwtPayloadSchemaDto extends customerSignupTenantJwtPayloadSchemaDto_base {
}
declare const wxGetAccessTokenRes: z.ZodObject<{
    access_token: z.ZodString;
    expires_in: z.ZodString;
    refresh_token: z.ZodString;
    openid: z.ZodString;
    scope: z.ZodString;
    unionid: z.ZodString;
    create_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    unionid: string;
    access_token: string;
    expires_in: string;
    refresh_token: string;
    openid: string;
    scope: string;
    create_at: string;
}, {
    unionid: string;
    access_token: string;
    expires_in: string;
    refresh_token: string;
    openid: string;
    scope: string;
    create_at: string;
}>;
type TWxGetAccessTokenRes = z.infer<typeof wxGetAccessTokenRes>;
declare const wxGetUserRes: z.ZodObject<{
    openid: z.ZodString;
    nickname: z.ZodString;
    sex: z.ZodNumber;
    headimgurl: z.ZodString;
    unionid: z.ZodString;
    language: z.ZodString;
    city: z.ZodString;
    province: z.ZodString;
    country: z.ZodString;
    privilege: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    unionid: string;
    openid: string;
    nickname: string;
    sex: number;
    headimgurl: string;
    language: string;
    city: string;
    province: string;
    country: string;
    privilege: string[];
}, {
    unionid: string;
    openid: string;
    nickname: string;
    sex: number;
    headimgurl: string;
    language: string;
    city: string;
    province: string;
    country: string;
    privilege: string[];
}>;
type TWxGetUser = z.infer<typeof wxGetUserRes>;
declare const wxValidateUserSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
declare const wxValidateUserTenantJwtPayloadSchemaDto_base: ZodDto<{
    code: string;
    tid: number;
}, z.ZodObjectDef<{
    code: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    code: string;
    tid: number;
}>;
declare class wxValidateUserTenantJwtPayloadSchemaDto extends wxValidateUserTenantJwtPayloadSchemaDto_base {
}
declare const generateRecoveryCodeSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const generateRecoveryCodeSchemaDto_base: ZodDto<{
    email: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
}>;
declare class generateRecoveryCodeSchemaDto extends generateRecoveryCodeSchemaDto_base {
}
declare const generateRecoveryCodeTenantJwtSchemaDto_base: ZodDto<{
    email: string;
    tid: number;
}, z.ZodObjectDef<{
    email: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    email: string;
    tid: number;
}>;
declare class generateRecoveryCodeTenantJwtSchemaDto extends generateRecoveryCodeTenantJwtSchemaDto_base {
}
declare const GenerateRecoveryCodeDto_base: ZodDto<{
    email: string;
    appId: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
    appId: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
    appId: string;
}>;
declare class GenerateRecoveryCodeDto extends GenerateRecoveryCodeDto_base {
}
declare const resetPasswordWithRecoveryCodeSchema: z.ZodObject<{
    recoveryCode: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    recoveryCode: string;
}, {
    password: string;
    recoveryCode: string;
}>;
declare const resetPasswordWithRecoveryCodeSchemaDto_base: ZodDto<{
    password: string;
    recoveryCode: string;
}, z.ZodObjectDef<{
    recoveryCode: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    password: string;
    recoveryCode: string;
}>;
declare class resetPasswordWithRecoveryCodeSchemaDto extends resetPasswordWithRecoveryCodeSchemaDto_base {
}
declare const resetPasswordWithRecoveryCodeTenantJwtSchemaDto_base: ZodDto<{
    password: string;
    tid: number;
    recoveryCode: string;
}, z.ZodObjectDef<{
    password: z.ZodString;
    recoveryCode: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    password: string;
    tid: number;
    recoveryCode: string;
}>;
declare class resetPasswordWithRecoveryCodeTenantJwtSchemaDto extends resetPasswordWithRecoveryCodeTenantJwtSchemaDto_base {
}
declare const ResetPasswordDto_base: ZodDto<{
    password: string;
    appId: string;
    recoveryCode: string;
}, z.ZodObjectDef<{
    password: z.ZodString;
    recoveryCode: z.ZodString;
    appId: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    password: string;
    appId: string;
    recoveryCode: string;
}>;
declare class ResetPasswordDto extends ResetPasswordDto_base {
}
declare const productCreateManyItemSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    productType: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
    plan: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    extendedDescriptionData: z.ZodOptional<z.ZodAny>;
    restricted: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    fileSize: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    storeDuration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    hasAds: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tecSupport: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    amount?: number | undefined;
    plan?: number | null | undefined;
    extendedDescriptionData?: any;
    restricted?: number | null | undefined;
    fileSize?: string | null | undefined;
    storeDuration?: number | null | undefined;
    hasAds?: string | null | undefined;
    tecSupport?: string | null | undefined;
    name: string;
    price: number;
    productType: string;
}, {
    amount?: number | undefined;
    plan?: number | null | undefined;
    extendedDescriptionData?: any;
    restricted?: number | null | undefined;
    fileSize?: string | null | undefined;
    storeDuration?: number | null | undefined;
    hasAds?: string | null | undefined;
    tecSupport?: string | null | undefined;
    name: string;
    price: number;
    productType: string;
}>;
declare const SdkProductCreateManyItemDto_base: ZodDto<{
    amount?: number | undefined;
    plan?: number | null | undefined;
    extendedDescriptionData?: any;
    restricted?: number | null | undefined;
    fileSize?: string | null | undefined;
    storeDuration?: number | null | undefined;
    hasAds?: string | null | undefined;
    tecSupport?: string | null | undefined;
    name: string;
    price: number;
    productType: string;
}, z.ZodObjectDef<{
    name: z.ZodString;
    price: z.ZodNumber;
    productType: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
    plan: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    extendedDescriptionData: z.ZodOptional<z.ZodAny>;
    restricted: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    fileSize: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    storeDuration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    hasAds: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    tecSupport: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny>, {
    amount?: number | undefined;
    plan?: number | null | undefined;
    extendedDescriptionData?: any;
    restricted?: number | null | undefined;
    fileSize?: string | null | undefined;
    storeDuration?: number | null | undefined;
    hasAds?: string | null | undefined;
    tecSupport?: string | null | undefined;
    name: string;
    price: number;
    productType: string;
}>;
declare class SdkProductCreateManyItemDto extends SdkProductCreateManyItemDto_base {
}
declare const updatePaidProfileSchema: z.ZodObject<{
    product: z.ZodObject<{
        productType: z.ZodAny;
        plan: z.ZodNullable<z.ZodNumber>;
        amount: z.ZodNullable<z.ZodNumber>;
        validityPeriod: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    }, {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    }>;
}, "strip", z.ZodTypeAny, {
    product: {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    };
}, {
    product: {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    };
}>;
declare const updateFreeProfileSchema: z.ZodObject<{
    product: z.ZodObject<{
        productType: z.ZodAny;
        plan: z.ZodNullable<z.ZodNumber>;
        amount: z.ZodNullable<z.ZodNumber>;
        validityPeriod: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    }, {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    }>;
}, "strip", z.ZodTypeAny, {
    product: {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    };
}, {
    product: {
        productType?: any;
        amount: number | null;
        plan: number | null;
        validityPeriod: number | null;
    };
}>;
declare const wxPayQuerySchema: z.ZodObject<{
    status: z.ZodNumber;
    trade_state: z.ZodString;
    transaction_id: z.ZodString;
    payer: z.ZodObject<{
        openid: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        openid: string;
    }, {
        openid: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: number;
    trade_state: string;
    transaction_id: string;
    payer: {
        openid: string;
    };
}, {
    status: number;
    trade_state: string;
    transaction_id: string;
    payer: {
        openid: string;
    };
}>;
type TWxPayQuery = z.infer<typeof wxPayQuerySchema>;
declare const fwhLoginSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
declare const fwhLoginTenantJwtPayloadSchemaDto_base: ZodDto<{
    code: string;
    tid: number;
}, z.ZodObjectDef<{
    code: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    code: string;
    tid: number;
}>;
declare class fwhLoginTenantJwtPayloadSchemaDto extends fwhLoginTenantJwtPayloadSchemaDto_base {
}
declare const amountUpdateSchema: z.ZodObject<{
    action: z.ZodOptional<z.ZodEnum<["decrement"]>>;
    count: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    action?: "decrement" | undefined;
    count?: number | undefined;
}, {
    action?: "decrement" | undefined;
    count?: number | undefined;
}>;
declare const amountUpdateSchemaDto_base: ZodDto<{
    action?: "decrement" | undefined;
    count?: number | undefined;
}, z.ZodObjectDef<{
    action: z.ZodOptional<z.ZodEnum<["decrement"]>>;
    count: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny>, {
    action?: "decrement" | undefined;
    count?: number | undefined;
}>;
declare class amountUpdateSchemaDto extends amountUpdateSchemaDto_base {
}
declare const amountUpdateUserJwtPayloadSchemaDto_base: ZodDto<{
    action?: "decrement" | undefined;
    count?: number | undefined;
    uid: number;
    tid: number;
}, z.ZodObjectDef<{
    action: z.ZodOptional<z.ZodEnum<["decrement"]>>;
    count: z.ZodOptional<z.ZodNumber>;
    uid: z.ZodNumber;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    action?: "decrement" | undefined;
    count?: number | undefined;
    uid: number;
    tid: number;
}>;
declare class amountUpdateUserJwtPayloadSchemaDto extends amountUpdateUserJwtPayloadSchemaDto_base {
}
declare const createOrderSchema: z.ZodObject<{
    productId: z.ZodNumber;
    openid: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    openid?: string | undefined;
    productId: number;
}, {
    openid?: string | undefined;
    productId: number;
}>;
declare const SdkCreateOrderDto_base: ZodDto<{
    openid?: string | undefined;
    productId: number;
}, z.ZodObjectDef<{
    productId: z.ZodNumber;
    openid: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    openid?: string | undefined;
    productId: number;
}>;
declare class SdkCreateOrderDto extends SdkCreateOrderDto_base {
}
declare const createOrderUserJwtPayloadSchemaDto_base: ZodDto<{
    openid?: string | undefined;
    uid: number;
    tid: number;
    productId: number;
}, z.ZodObjectDef<{
    openid: z.ZodOptional<z.ZodString>;
    productId: z.ZodNumber;
    uid: z.ZodNumber;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    openid?: string | undefined;
    uid: number;
    tid: number;
    productId: number;
}>;
declare class createOrderUserJwtPayloadSchemaDto extends createOrderUserJwtPayloadSchemaDto_base {
}
declare const transactionsNativeSchema: z.ZodObject<{
    orderId: z.ZodString;
    desc: z.ZodString;
    total: z.ZodNumber;
    openid: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    openid?: string | undefined;
    desc: string;
    orderId: string;
    total: number;
}, {
    openid?: string | undefined;
    desc: string;
    orderId: string;
    total: number;
}>;
declare const transactionsNativeSchemaDto_base: ZodDto<{
    openid?: string | undefined;
    desc: string;
    orderId: string;
    total: number;
}, z.ZodObjectDef<{
    orderId: z.ZodString;
    desc: z.ZodString;
    total: z.ZodNumber;
    openid: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    openid?: string | undefined;
    desc: string;
    orderId: string;
    total: number;
}>;
declare class transactionsNativeSchemaDto extends transactionsNativeSchemaDto_base {
}
declare const createOrderJSAPISchema: z.ZodObject<{
    productId: z.ZodNumber;
    openid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    openid: string;
    productId: number;
}, {
    openid: string;
    productId: number;
}>;
declare const SdkCreateOrderInJSAPIDto_base: ZodDto<{
    openid: string;
    productId: number;
}, z.ZodObjectDef<{
    productId: z.ZodNumber;
    openid: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    openid: string;
    productId: number;
}>;
declare class SdkCreateOrderInJSAPIDto extends SdkCreateOrderInJSAPIDto_base {
}
declare const createQuickOrderSchema: z.ZodObject<{
    openid: z.ZodOptional<z.ZodString>;
    productId: z.ZodNumber;
    anonymousCustomerToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    openid?: string | undefined;
    productId: number;
    anonymousCustomerToken: string;
}, {
    openid?: string | undefined;
    productId: number;
    anonymousCustomerToken: string;
}>;
declare const SdkCreateQuickOrderDto_base: ZodDto<{
    openid?: string | undefined;
    productId: number;
    anonymousCustomerToken: string;
}, z.ZodObjectDef<{
    openid: z.ZodOptional<z.ZodString>;
    productId: z.ZodNumber;
    anonymousCustomerToken: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    openid?: string | undefined;
    productId: number;
    anonymousCustomerToken: string;
}>;
declare class SdkCreateQuickOrderDto extends SdkCreateQuickOrderDto_base {
}
declare const createQuickOrderTenantJWTPayloadSchemaDto_base: ZodDto<{
    openid?: string | undefined;
    tid: number;
    productId: number;
    anonymousCustomerToken: string;
}, z.ZodObjectDef<{
    openid: z.ZodOptional<z.ZodString>;
    productId: z.ZodNumber;
    anonymousCustomerToken: z.ZodString;
    tid: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    openid?: string | undefined;
    tid: number;
    productId: number;
    anonymousCustomerToken: string;
}>;
declare class createQuickOrderTenantJWTPayloadSchemaDto extends createQuickOrderTenantJWTPayloadSchemaDto_base {
}
declare const appCreateV4Schema: z.ZodObject<{
    displayName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    displayName: string;
}, {
    displayName: string;
}>;
declare const appCreateV4SchemaDto_base: ZodDto<{
    displayName: string;
}, z.ZodObjectDef<{
    displayName: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    displayName: string;
}>;
declare class appCreateV4SchemaDto extends appCreateV4SchemaDto_base {
}
declare const validateTenantSchema: z.ZodObject<{
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    password: string;
}, {
    name: string;
    password: string;
}>;
declare const validateTenantSchemaDto_base: ZodDto<{
    name: string;
    password: string;
}, z.ZodObjectDef<{
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    name: string;
    password: string;
}>;
declare class validateTenantSchemaDto extends validateTenantSchemaDto_base {
}
declare const validateByEmailSchema: z.ZodObject<{
    email: z.ZodString;
    tenantId: z.ZodNumber;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    tenantId: number;
}, {
    email: string;
    password: string;
    tenantId: number;
}>;
declare const validateByEmailSchemaDto_base: ZodDto<{
    email: string;
    password: string;
    tenantId: number;
}, z.ZodObjectDef<{
    email: z.ZodString;
    tenantId: z.ZodNumber;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email: string;
    password: string;
    tenantId: number;
}>;
declare class validateByEmailSchemaDto extends validateByEmailSchemaDto_base {
}
declare const _resetTenantPasswordSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
declare const _resetTenantPasswordSchemaDto_base: ZodDto<{
    id: number;
}, z.ZodObjectDef<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny>, {
    id: number;
}>;
declare class _resetTenantPasswordSchemaDto extends _resetTenantPasswordSchemaDto_base {
}
declare const customerExtendDataSchema: z.ZodObject<{
    biz: z.ZodOptional<z.ZodString>;
    icp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodOptional<z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    }>>;
    companyName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    biz?: string | undefined;
    icp?: string | null | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    } | undefined;
    companyName?: string | undefined;
    description?: string | undefined;
}, {
    biz?: string | undefined;
    icp?: string | null | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    } | undefined;
    companyName?: string | undefined;
    description?: string | undefined;
}>;
declare const customerExtendDataSchemaDto_base: ZodDto<{
    biz?: string | undefined;
    icp?: string | null | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    } | undefined;
    companyName?: string | undefined;
    description?: string | undefined;
}, z.ZodObjectDef<{
    biz: z.ZodOptional<z.ZodString>;
    icp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contact: z.ZodOptional<z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    }, {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    }>>;
    companyName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    biz?: string | undefined;
    icp?: string | null | undefined;
    contact?: {
        email?: string | undefined;
        phone?: string | undefined;
        address?: string | undefined;
    } | undefined;
    companyName?: string | undefined;
    description?: string | undefined;
}>;
declare class customerExtendDataSchemaDto extends customerExtendDataSchemaDto_base {
}
declare const kanzhunDetailSchema: z.ZodObject<{
    公司全称: z.ZodOptional<z.ZodString>;
    联系方式: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    地址: z.ZodOptional<z.ZodString>;
    简介: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    公司全称?: string | undefined;
    联系方式?: string[] | undefined;
    地址?: string | undefined;
    简介?: string | undefined;
}, {
    公司全称?: string | undefined;
    联系方式?: string[] | undefined;
    地址?: string | undefined;
    简介?: string | undefined;
}>;
declare const kanzhunDetailSchemaDto_base: ZodDto<{
    公司全称?: string | undefined;
    联系方式?: string[] | undefined;
    地址?: string | undefined;
    简介?: string | undefined;
}, z.ZodObjectDef<{
    公司全称: z.ZodOptional<z.ZodString>;
    联系方式: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    地址: z.ZodOptional<z.ZodString>;
    简介: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    公司全称?: string | undefined;
    联系方式?: string[] | undefined;
    地址?: string | undefined;
    简介?: string | undefined;
}>;
declare class kanzhunDetailSchemaDto extends kanzhunDetailSchemaDto_base {
}
declare const kanzhunItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    detail: z.ZodOptional<z.ZodObject<{
        公司全称: z.ZodOptional<z.ZodString>;
        联系方式: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        地址: z.ZodOptional<z.ZodString>;
        简介: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    }, {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    id?: number | undefined;
    detail?: {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    } | undefined;
}, {
    name?: string | undefined;
    id?: number | undefined;
    detail?: {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    } | undefined;
}>;
declare const kanzhunItemSchemaDto_base: ZodDto<{
    name?: string | undefined;
    id?: number | undefined;
    detail?: {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    } | undefined;
}, z.ZodObjectDef<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    detail: z.ZodOptional<z.ZodObject<{
        公司全称: z.ZodOptional<z.ZodString>;
        联系方式: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        地址: z.ZodOptional<z.ZodString>;
        简介: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    }, {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny>, {
    name?: string | undefined;
    id?: number | undefined;
    detail?: {
        公司全称?: string | undefined;
        联系方式?: string[] | undefined;
        地址?: string | undefined;
        简介?: string | undefined;
    } | undefined;
}>;
declare class kanzhunItemSchemaDto extends kanzhunItemSchemaDto_base {
}
declare const kanzhunDataSchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodNumber>;
        name: z.ZodOptional<z.ZodString>;
        detail: z.ZodOptional<z.ZodObject<{
            公司全称: z.ZodOptional<z.ZodString>;
            联系方式: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            地址: z.ZodOptional<z.ZodString>;
            简介: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            公司全称?: string | undefined;
            联系方式?: string[] | undefined;
            地址?: string | undefined;
            简介?: string | undefined;
        }, {
            公司全称?: string | undefined;
            联系方式?: string[] | undefined;
            地址?: string | undefined;
            简介?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        id?: number | undefined;
        detail?: {
            公司全称?: string | undefined;
            联系方式?: string[] | undefined;
            地址?: string | undefined;
            简介?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        id?: number | undefined;
        detail?: {
            公司全称?: string | undefined;
            联系方式?: string[] | undefined;
            地址?: string | undefined;
            简介?: string | undefined;
        } | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    data?: {
        name?: string | undefined;
        id?: number | undefined;
        detail?: {
            公司全称?: string | undefined;
            联系方式?: string[] | undefined;
            地址?: string | undefined;
            简介?: string | undefined;
        } | undefined;
    }[] | undefined;
    date?: string | undefined;
}, {
    data?: {
        name?: string | undefined;
        id?: number | undefined;
        detail?: {
            公司全称?: string | undefined;
            联系方式?: string[] | undefined;
            地址?: string | undefined;
            简介?: string | undefined;
        } | undefined;
    }[] | undefined;
    date?: string | undefined;
}>;
declare const sendSmsVerifyCodeSchema: z.ZodObject<{
    mobile: z.ZodString;
}, "strip", z.ZodTypeAny, {
    mobile: string;
}, {
    mobile: string;
}>;
declare const sendSmsVerifyCodeSchemaDto_base: ZodDto<{
    mobile: string;
}, z.ZodObjectDef<{
    mobile: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    mobile: string;
}>;
declare class sendSmsVerifyCodeSchemaDto extends sendSmsVerifyCodeSchemaDto_base {
}
declare const refreshTokenSchema: z.ZodObject<{
    rt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    rt: string;
}, {
    rt: string;
}>;
declare const refreshTokenSchemaDto_base: ZodDto<{
    rt: string;
}, z.ZodObjectDef<{
    rt: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    rt: string;
}>;
declare class refreshTokenSchemaDto extends refreshTokenSchemaDto_base {
}
declare const ctxTenantSchema: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
}, {
    name: string;
    id: number;
}>;
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
declare const ctxUserSchema: z.ZodObject<{
    id: z.ZodNumber;
    tenantId: z.ZodNumber;
    username: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    tenantId: number;
    id: number;
}, {
    username: string;
    tenantId: number;
    id: number;
}>;
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
declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
declare const loginSchemaDto_base: ZodDto<{
    username: string;
    password: string;
}, z.ZodObjectDef<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    username: string;
    password: string;
}>;
declare class loginSchemaDto extends loginSchemaDto_base {
}

export { APISymbol, AccountExistsSchemaDto, COSSymbol, CustomZodSchemaSymbol, DataServiceSymbol, DynamicTableDataServiceSymbol, DynamicTableDefServiceSymbol, DynamicTableSchemaTransformerSymbol, ENVSymbol, EPlan, FindByUnionIdAndTenantIdSchemaDto, FlowdaGatewayTrpcClientSymbol, FlowdaTrpcClientSymbol, GenerateRecoveryCodeDto, GetTenantByNameSchemaDto, GridModelSymbol, type IPrismaFilterSchema, type IResourceAssociationSchema, type IResourceColumnSchema, type IResourceSchema, type ISchemaSelectOption, K3CloudIdentifyInfoSymbol, LoginModelSymbol, MenuServiceSymbol, PrismaClientSymbol, PrismaSchemaServiceSymbol, PrismaUtilsSymbol, PrismaZodSchemaSymbol, RegisterByUnionIdSchemaDto, RegisterDto, ResetPasswordDto, SchemaServiceSymbol, SchemaTransformerSymbol, SdkCreateOrderDto, SdkCreateOrderInJSAPIDto, SdkCreateQuickOrderDto, SdkProductCreateManyItemDto, Serial_Max, Serial_Min, ServiceSymbol, SmsClientSymbol, type TAgFilter1Schema, type TAgFilterSchema, type TAgSortSchema, type TCtx, type TFilterFormValue, type TWxGetAccessTokenRes, type TWxGetUser, type TWxPayQuery, URLSymbol, WechatOAuthSymbol, WechatpayNodeV3FactorySymbol, WechatpayNodeV3Symbol, type ZodDto, _resetTenantPasswordSchema, _resetTenantPasswordSchemaDto, accountExistsSchema, agFilter1Schema, agFilter2Schema, agFilterInner2Schema, agFilterInnerSchema, agFilterSchema, agSortSchema, amountUpdateSchema, amountUpdateSchemaDto, amountUpdateUserJwtPayloadSchemaDto, appCreateV4Schema, appCreateV4SchemaDto, createOrderJSAPISchema, createOrderSchema, createOrderUserJwtPayloadSchemaDto, createQuickOrderSchema, createQuickOrderTenantJWTPayloadSchemaDto, createZodDto, ctxTenantSchema, ctxTenantSchemaDto, ctxUserSchema, ctxUserSchemaDto, customerExtendDataSchema, customerExtendDataSchemaDto, customerPreSignupSchema, customerPreSignupSchemaDto, customerPreSignupTenantJwtPayloadSchemaDto, customerSignupSchema, customerSignupSchemaDto, customerSignupTenantJwtPayloadSchemaDto, findByUnionIdAndTenantIdSchema, fwhLoginSchema, fwhLoginTenantJwtPayloadSchemaDto, generateRecoveryCodeSchema, generateRecoveryCodeSchemaDto, generateRecoveryCodeTenantJwtSchemaDto, getTenantByNameSchema, kanzhunDataSchema, kanzhunDetailSchema, kanzhunDetailSchemaDto, kanzhunItemSchema, kanzhunItemSchemaDto, loginSchema, loginSchemaDto, prismaFilterSchema, productCreateManyItemSchema, refreshTokenSchema, refreshTokenSchemaDto, registerByUnionIdSchema, registerSchema, resetPasswordSchema, resetPasswordSchemaDto, resetPasswordWithRecoveryCodeSchema, resetPasswordWithRecoveryCodeSchemaDto, resetPasswordWithRecoveryCodeTenantJwtSchemaDto, resourceAssociationSchema, resourceColumnSchema, resourceSchema, selectOptionSchema, sendSmsVerifyCodeSchema, sendSmsVerifyCodeSchemaDto, tenantJwtPayloadSchema, transactionsNativeSchema, transactionsNativeSchemaDto, updateFreeProfileSchema, updatePaidProfileSchema, userJwtPayloadSchema, userJwtPayloadSchemaDto, validateByEmailSchema, validateByEmailSchemaDto, validateSchema, validateSchemaDto, validateTenantSchema, validateTenantSchemaDto, verifyMobileSchema, verifyMobileSchemaDto, wxGetAccessTokenRes, wxGetUserRes, wxPayQuerySchema, wxValidateUserSchema, wxValidateUserTenantJwtPayloadSchemaDto };
