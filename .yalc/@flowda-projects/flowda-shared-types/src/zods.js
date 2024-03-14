import { z } from 'zod';
import { createZodDto } from './zod-utils';
export const selectOptionSchema = z.object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
});
export const resourceAssociationSchema = z.object({
    foreign_key: z.string(),
    model_name: z.string(),
    primary_key: z.string(),
    name: z.string(),
    slug: z.string(),
    display_name: z.string(),
    schema_name: z.string(),
});
export const resourceColumnSchema = z.object({
    name: z.string(),
    access_type: z.enum(['read_only']).optional(),
    column_type: z.enum(['reference', 'string', 'tag', 'integer', 'datetime', 'textarea', 'boolean']),
    prisma: z.boolean().optional(),
    format: z
        .object({
        select_options: selectOptionSchema.array(),
    })
        .optional(),
    reference: z.object({
        model_name: z.string(),
        primary_key: z.string(),
        display_name: z.string(),
        display_column: z.union([z.string(), z.array(z.string()), z.undefined()]),
        'x-relationField': z.string(),
        'x-onSoftDelete': z.string(),
        'x-unique': z.boolean().optional(),
    }),
    display_name: z.string().optional(),
    validators: z.array(z.union([
        z.object({
            required: z.boolean(),
        }),
        z.object({
            format: z.string(),
            message: z.string(),
        }),
    ])),
});
export const resourceSchema = z.object({
    namespace: z.string().optional(),
    prisma: z.boolean().optional(),
    is_dynamic: z.boolean().optional(),
    schema_name: z.string(),
    name: z.string(),
    slug: z.string(),
    primary_key: z.string(),
    custom: z.any(),
    display_column: z.union([z.string(), z.array(z.string()), z.undefined()]),
    display_name: z.string().nullable(),
    display_primary_key: z.boolean(),
    searchable_columns: z.array(z.string()).optional(),
    columns: resourceColumnSchema.array(),
    associations: resourceAssociationSchema.array(),
    __jsonschema: z.any(),
});
export const agFilterInnerSchema = z.object({
    filterType: z.enum(['text', 'number']),
    // filterType: z.string(),
    type: z.enum(['contains', 'equals']),
    // type: z.string(),
    filter: z.union([z.string(), z.number()]),
});
export const agFilterInner2Schema = z.object({
    filterType: z.enum(['text']),
    // filterType: z.string(),
    operator: z.enum(['OR', 'AND']),
    // operator: z.string(),
    conditions: z.array(agFilterInnerSchema),
});
export const agFilter1Schema = z.record(agFilterInnerSchema);
export const agFilter2Schema = z.record(agFilterInner2Schema);
export const agFilterSchema = z
    .record(agFilterInnerSchema.or(agFilterInner2Schema))
    .or(z.object({ _ref: z.string().optional() }));
export const agSortSchema = z.array(z.object({
    colId: z.string(),
    sort: z.enum(['asc', 'desc']),
}));
export const prismaFilterSchema = z.object({
    OR: z.array(z.record(z.record(z.enum(['contains']), z.string()))),
});
export const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
    tenantId: z.number(),
});
export class RegisterDto extends createZodDto(registerSchema) {
}
export const accountExistsSchema = z.object({
    username: z.string(),
    tenantName: z.string(),
});
export class AccountExistsSchemaDto extends createZodDto(accountExistsSchema) {
}
export const validateSchema = z.object({
    username: z.string(),
    password: z.string(),
});
export class validateSchemaDto extends createZodDto(validateSchema) {
}
export const getTenantByNameSchema = z.object({
    tenantName: z.string(),
});
export class GetTenantByNameSchemaDto extends createZodDto(getTenantByNameSchema) {
}
export const findByUnionIdAndTenantIdSchema = z.object({
    unionid: z.string(),
    tenantId: z.number(),
});
export class FindByUnionIdAndTenantIdSchemaDto extends createZodDto(findByUnionIdAndTenantIdSchema) {
}
export const registerByUnionIdSchema = z.object({
    unionid: z.string(),
    tenantId: z.number(),
});
export class RegisterByUnionIdSchemaDto extends createZodDto(registerByUnionIdSchema) {
}
export const resetPasswordSchema = z.object({
    userId: z.number(),
    tenantId: z.number(),
    password: z.string(),
});
export class resetPasswordSchemaDto extends createZodDto(resetPasswordSchema) {
}
export const verifyMobileSchema = z.object({
    uid: z.number(),
    tid: z.number(),
    mobile: z.string(),
    code: z.string(),
    slug: z.string(),
});
export class verifyMobileSchemaDto extends createZodDto(verifyMobileSchema) {
}
export const tenantJwtPayloadSchema = z.object({
    tid: z.number(),
});
export const userJwtPayloadSchema = z.object({
    uid: z.number(),
    tid: z.number(),
});
export class userJwtPayloadSchemaDto extends createZodDto(userJwtPayloadSchema) {
}
export const customerPreSignupSchema = z.object({
    email: z.string(),
});
export class customerPreSignupSchemaDto extends createZodDto(customerPreSignupSchema) {
}
export class customerPreSignupTenantJwtPayloadSchemaDto extends createZodDto(customerPreSignupSchema.merge(tenantJwtPayloadSchema)) {
}
export const customerSignupSchema = z.object({
    email: z.string(),
    verifyCode: z.string(),
    password: z.string(),
});
export class customerSignupSchemaDto extends createZodDto(customerSignupSchema) {
}
export class customerSignupTenantJwtPayloadSchemaDto extends createZodDto(customerSignupSchema.merge(tenantJwtPayloadSchema)) {
}
export const wxGetAccessTokenRes = z.object({
    access_token: z.string(),
    expires_in: z.string(),
    refresh_token: z.string(),
    openid: z.string(),
    scope: z.string(),
    unionid: z.string(),
    create_at: z.string(),
});
export const wxGetUserRes = z.object({
    openid: z.string(),
    nickname: z.string(),
    sex: z.number(),
    headimgurl: z.string(),
    unionid: z.string(),
    language: z.string(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    privilege: z.array(z.string()),
});
export const wxValidateUserSchema = z.object({
    code: z.string(),
});
export class wxValidateUserTenantJwtPayloadSchemaDto extends createZodDto(wxValidateUserSchema.merge(tenantJwtPayloadSchema)) {
}
export const generateRecoveryCodeSchema = z.object({
    email: z.string(),
});
export class generateRecoveryCodeSchemaDto extends createZodDto(generateRecoveryCodeSchema) {
}
export class generateRecoveryCodeTenantJwtSchemaDto extends createZodDto(generateRecoveryCodeSchema.merge(tenantJwtPayloadSchema)) {
}
export class GenerateRecoveryCodeDto extends createZodDto(generateRecoveryCodeSchema.merge(z.object({
    appId: z.string(),
}))) {
}
export const resetPasswordWithRecoveryCodeSchema = z.object({
    recoveryCode: z.string(),
    password: z.string(),
});
export class resetPasswordWithRecoveryCodeSchemaDto extends createZodDto(resetPasswordWithRecoveryCodeSchema) {
}
export class resetPasswordWithRecoveryCodeTenantJwtSchemaDto extends createZodDto(resetPasswordWithRecoveryCodeSchema.merge(tenantJwtPayloadSchema)) {
}
export class ResetPasswordDto extends createZodDto(resetPasswordWithRecoveryCodeSchema.merge(z.object({
    appId: z.string(),
}))) {
}
export const productCreateManyItemSchema = z.object({
    name: z.string(),
    price: z.number(),
    productType: z.string(),
    amount: z.number().optional(),
    plan: z.number().nullable().optional(),
    extendedDescriptionData: z.any().optional(),
    restricted: z.number().nullable().optional(),
    fileSize: z.string().nullable().optional(),
    storeDuration: z.number().nullable().optional(),
    hasAds: z.string().nullable().optional(),
    tecSupport: z.string().nullable().optional(),
});
export class SdkProductCreateManyItemDto extends createZodDto(productCreateManyItemSchema) {
}
export const updatePaidProfileSchema = z.object({
    product: z.object({
        productType: z.any(),
        plan: z.number().nullable(),
        amount: z.number().nullable(),
        validityPeriod: z.number().nullable(),
    }),
});
export const updateFreeProfileSchema = z.object({
    product: z.object({
        productType: z.any(),
        plan: z.number().nullable(),
        amount: z.number().nullable(),
        validityPeriod: z.number().nullable(),
    }),
});
export const wxPayQuerySchema = z.object({
    status: z.number(),
    trade_state: z.string(),
    transaction_id: z.string(),
    payer: z.object({
        openid: z.string(),
    }),
});
export const fwhLoginSchema = z.object({
    code: z.string(),
});
export class fwhLoginTenantJwtPayloadSchemaDto extends createZodDto(fwhLoginSchema.merge(tenantJwtPayloadSchema)) {
}
export const amountUpdateSchema = z.object({
    action: z.enum(['decrement']).optional(),
    count: z.number().optional(),
});
export class amountUpdateSchemaDto extends createZodDto(amountUpdateSchema) {
}
export class amountUpdateUserJwtPayloadSchemaDto extends createZodDto(amountUpdateSchema.merge(userJwtPayloadSchema)) {
}
export const createOrderSchema = z.object({
    productId: z.number(),
    openid: z.string().optional(),
});
export class SdkCreateOrderDto extends createZodDto(createOrderSchema) {
}
export class createOrderUserJwtPayloadSchemaDto extends createZodDto(createOrderSchema.merge(userJwtPayloadSchema)) {
}
export const transactionsNativeSchema = z.object({
    orderId: z.string(),
    desc: z.string(),
    total: z.number(),
    openid: z.string().optional(),
});
export class transactionsNativeSchemaDto extends createZodDto(transactionsNativeSchema) {
}
export const createOrderJSAPISchema = createOrderSchema.extend({ openid: z.string() });
export class SdkCreateOrderInJSAPIDto extends createZodDto(createOrderJSAPISchema) {
}
export const createQuickOrderSchema = createOrderSchema.extend({
    // 快捷创建需要客户端提供一个匿名 Token
    anonymousCustomerToken: z.string(),
});
export class SdkCreateQuickOrderDto extends createZodDto(createQuickOrderSchema) {
}
export class createQuickOrderTenantJWTPayloadSchemaDto extends createZodDto(createQuickOrderSchema.merge(tenantJwtPayloadSchema)) {
}
export const appCreateV4Schema = z.object({
    displayName: z.string(),
});
export class appCreateV4SchemaDto extends createZodDto(appCreateV4Schema) {
}
export const validateTenantSchema = z.object({
    name: z.string(),
    password: z.string(),
});
export class validateTenantSchemaDto extends createZodDto(validateTenantSchema) {
}
export const validateByEmailSchema = z.object({
    email: z.string(),
    tenantId: z.number(),
    password: z.string(),
});
export class validateByEmailSchemaDto extends createZodDto(validateByEmailSchema) {
}
export const _resetTenantPasswordSchema = z.object({
    id: z.number(),
});
export class _resetTenantPasswordSchemaDto extends createZodDto(_resetTenantPasswordSchema) {
}
export const customerExtendDataSchema = z
    .object({
    biz: z.string(),
    icp: z.string().nullable(),
    contact: z
        .object({
        email: z.string(),
        phone: z.string(),
        address: z.string(),
    })
        .partial(),
    companyName: z.string(),
    description: z.string(),
})
    .partial();
export class customerExtendDataSchemaDto extends createZodDto(customerExtendDataSchema) {
}
export const kanzhunDetailSchema = z
    .object({
    公司全称: z.string(),
    联系方式: z.array(z.string()),
    地址: z.string(),
    简介: z.string(),
})
    .partial();
export class kanzhunDetailSchemaDto extends createZodDto(kanzhunDetailSchema) {
}
export const kanzhunItemSchema = z
    .object({
    id: z.number(),
    name: z.string(),
    detail: kanzhunDetailSchema,
})
    .partial();
export class kanzhunItemSchemaDto extends createZodDto(kanzhunItemSchema) {
}
export const kanzhunDataSchema = z
    .object({
    date: z.string(),
    data: z.array(kanzhunItemSchema),
})
    .partial();
export const sendSmsVerifyCodeSchema = z.object({ mobile: z.string() });
export class sendSmsVerifyCodeSchemaDto extends createZodDto(sendSmsVerifyCodeSchema) {
}
export const refreshTokenSchema = z.object({ rt: z.string() });
export class refreshTokenSchemaDto extends createZodDto(refreshTokenSchema) {
}
export const ctxTenantSchema = z.object({
    id: z.number(),
    name: z.string(),
});
export class ctxTenantSchemaDto extends createZodDto(ctxTenantSchema) {
}
export const ctxUserSchema = z.object({
    id: z.number(),
    tenantId: z.number(),
    username: z.string(),
});
export class ctxUserSchemaDto extends createZodDto(ctxUserSchema) {
}
export const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(4),
});
export class loginSchemaDto extends createZodDto(loginSchema) {
}
//# sourceMappingURL=zods.js.map