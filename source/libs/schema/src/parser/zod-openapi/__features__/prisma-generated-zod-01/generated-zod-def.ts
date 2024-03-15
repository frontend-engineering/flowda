import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { extendZodWithOpenApi } from '../../extend-zod'

extendZodWithOpenApi(z)

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;

// DECIMAL
//------------------------------------------------------

export const DecimalJSLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), });

export const DecimalJSLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), }).array();

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TenantScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','name','hashedPassword','hashedRefreshToken','displayName']);

export const TaskFormRelationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','taskDefinitionKey','formKey']);

export const TableFilterScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','path','name','filterJSON']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','username','hashedPassword','hashedRefreshToken','recoveryCode','recoveryToken','email','mobile','anonymousCustomerToken','image','tenantId','weixinProfileId']);

export const UserPreSignupScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','email','verifyCode','tenantId']);

export const UserProfileScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','userId','fullName','tenantId']);

export const AuditsScalarFieldEnumSchema = z.enum(['id','createdAt','auditId','auditType','userId','username','action','auditChanges','version']);

export const DynamicTableDefScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','name','extendedSchema','tenantId']);

export const DynamicTableDefColumnScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','dynamicTableDefId','name','type','extendedSchema','tenantId']);

export const DynamicTableDataScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','dynamicTableDefId','data','tenantId']);

export const MenuScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','treeData','tenantId']);

export const SentSmsScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','mobile','code']);

export const WeixinProfileScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','unionOrOpenid','unionid','loginOpenid','headimgurl','nickname','sex']);

export const OrderProfileScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','tenantId','userId','productType','plan','amount','expireAt']);

export const ProductScalarFieldEnumSchema = z.enum(['id','uid','createdAt','updatedAt','isDeleted','tenantId','name','price','productType','plan','amount','extendedDescriptionData','fileSize','storeDuration','hasAds','tecSupport','validityPeriod','restricted']);

export const ProductSnapshotScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','userId','tenantId','snapshotPrice','orderId','productId']);

export const OrderScalarFieldEnumSchema = z.enum(['id','uid','createdAt','updatedAt','isDeleted','userId','tenantId','serial','status']);

export const PayScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','isDeleted','userId','tenantId','status','orderId','transactionId']);

export const RequestErrorLogScalarFieldEnumSchema = z.enum(['id','createdAt','isDeleted','requestId','tenantId','userId','log']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const DynamicColumnTypeSchema = z.enum(['string','textarea','integer','boolean','datetime','tag','reference'])

export type DynamicColumnTypeType = `${z.infer<typeof DynamicColumnTypeSchema>}`

export const ProductTypeSchema = z.enum(['AMOUNT','PLAN'])

export type ProductTypeType = `${z.infer<typeof ProductTypeSchema>}`

export const OrderStatusSchema = z.enum(['INITIALIZED','PAY_ASSOCIATED','FREE_DEAL','CANCELED'])

export type OrderStatusType = `${z.infer<typeof OrderStatusSchema>}`

export const PayStatusSchema = z.enum(['UNPAIED','PAIED','REFUND'])

export type PayStatusType = `${z.infer<typeof PayStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  name: z.string().openapi({"title":"租户唯一名称"}),
  hashedPassword: z.string().nullable(),
  hashedRefreshToken: z.string().nullable(),
  displayName: z.string().nullable().openapi({"title":"租户显示名称"}),
}).openapi({"display_name":"租户信息","display_column":"name"})

export type Tenant = z.infer<typeof TenantSchema>

// TENANT RELATION SCHEMA
//------------------------------------------------------

export type TenantRelations = {
  menu?: MenuWithRelations | null;
  users: UserWithRelations[];
  dynamicTableDefs: DynamicTableDefWithRelations[];
  dynamicTableDefColumns: DynamicTableDefColumnWithRelations[];
  dynamicTableData: DynamicTableDataWithRelations[];
  userPreSignup: UserPreSignupWithRelations[];
  orderProfile: OrderProfileWithRelations[];
  userProfile: UserProfileWithRelations[];
  productSnapshots: ProductSnapshotWithRelations[];
  orders: OrderWithRelations[];
  pays: PayWithRelations[];
  products: ProductWithRelations[];
};

export type TenantWithRelations = z.infer<typeof TenantSchema> & TenantRelations

export const TenantWithRelationsSchema: z.ZodObject<any> = TenantSchema.merge(z.object({
  menu: z.lazy(() => MenuWithRelationsSchema).nullable(),
  users: z.lazy(() => UserWithRelationsSchema).array().openapi({"model_name":"User"}),
  dynamicTableDefs: z.lazy(() => DynamicTableDefWithRelationsSchema).array().openapi({"model_name":"DynamicTableDef"}),
  dynamicTableDefColumns: z.lazy(() => DynamicTableDefColumnWithRelationsSchema).array().openapi({"model_name":"DynamicTableDefColumn"}),
  dynamicTableData: z.lazy(() => DynamicTableDataWithRelationsSchema).array().openapi({"model_name":"DynamicTableData"}),
  userPreSignup: z.lazy(() => UserPreSignupWithRelationsSchema).array().openapi({"model_name":"UserPreSignup"}),
  orderProfile: z.lazy(() => OrderProfileWithRelationsSchema).array().openapi({"model_name":"OrderProfile"}),
  userProfile: z.lazy(() => UserProfileWithRelationsSchema).array().openapi({"model_name":"UserProfile"}),
  productSnapshots: z.lazy(() => ProductSnapshotWithRelationsSchema).array().openapi({"model_name":"ProductSnapshot"}),
  orders: z.lazy(() => OrderWithRelationsSchema).array().openapi({"model_name":"Order"}),
  pays: z.lazy(() => PayWithRelationsSchema).array().openapi({"model_name":"Pay"}),
  products: z.lazy(() => ProductWithRelationsSchema).array().openapi({"model_name":"Product"}),
}))

/////////////////////////////////////////
// TASK FORM RELATION SCHEMA
/////////////////////////////////////////

export const TaskFormRelationSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  taskDefinitionKey: z.string(),
  formKey: z.string(),
}).openapi({"display_name":"节点和表单关联关系"})

export type TaskFormRelation = z.infer<typeof TaskFormRelationSchema>

/////////////////////////////////////////
// TABLE FILTER SCHEMA
/////////////////////////////////////////

export const TableFilterSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  path: z.string(),
  name: z.string(),
  filterJSON: z.string(),
}).openapi({"display_name":"表和查询条件的关系"})

export type TableFilter = z.infer<typeof TableFilterSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  username: z.string(),
  hashedPassword: z.string().nullable(),
  hashedRefreshToken: z.string().nullable(),
  recoveryCode: z.string().nullable(),
  recoveryToken: z.string().nullable(),
  email: z.string().nullable().openapi({"title":"邮箱"}),
  mobile: z.string().nullable().openapi({"title":"手机号"}),
  anonymousCustomerToken: z.string().nullable().openapi({"title":"快捷创建"}),
  image: z.string().nullable().openapi({"title":"头像"}),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
  weixinProfileId: z.number().int().nullable().openapi({"reference":"WeixinProfile"}),
}).openapi({"display_name":"员工","display_column":"username"})

export type User = z.infer<typeof UserSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  tenant: TenantWithRelations;
  profile?: UserProfileWithRelations | null;
  weixinProfile?: WeixinProfileWithRelations | null;
  orderProfile?: OrderProfileWithRelations | null;
  productSnapshots: ProductSnapshotWithRelations[];
  orders: OrderWithRelations[];
  pays: PayWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodObject<any> = UserSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema),
  profile: z.lazy(() => UserProfileWithRelationsSchema).nullable(),
  weixinProfile: z.lazy(() => WeixinProfileWithRelationsSchema).nullable(),
  orderProfile: z.lazy(() => OrderProfileWithRelationsSchema).nullable(),
  productSnapshots: z.lazy(() => ProductSnapshotWithRelationsSchema).array().openapi({"model_name":"ProductSnapshot"}),
  orders: z.lazy(() => OrderWithRelationsSchema).array().openapi({"model_name":"Order"}),
  pays: z.lazy(() => PayWithRelationsSchema).array().openapi({"model_name":"Pay"}),
}))

/////////////////////////////////////////
// USER PRE SIGNUP SCHEMA
/////////////////////////////////////////

export const UserPreSignupSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  email: z.string(),
  verifyCode: z.string(),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
}).openapi({"display_name":"用户预注册表","display_column":"email"})

export type UserPreSignup = z.infer<typeof UserPreSignupSchema>

// USER PRE SIGNUP RELATION SCHEMA
//------------------------------------------------------

export type UserPreSignupRelations = {
  tenant: TenantWithRelations;
};

export type UserPreSignupWithRelations = z.infer<typeof UserPreSignupSchema> & UserPreSignupRelations

export const UserPreSignupWithRelationsSchema: z.ZodObject<any> = UserPreSignupSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema),
}))

/////////////////////////////////////////
// USER PROFILE SCHEMA
/////////////////////////////////////////

export const UserProfileSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.number().int(),
  fullName: z.string(),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

// USER PROFILE RELATION SCHEMA
//------------------------------------------------------

export type UserProfileRelations = {
  user: UserWithRelations;
  tenant: TenantWithRelations;
};

export type UserProfileWithRelations = z.infer<typeof UserProfileSchema> & UserProfileRelations

export const UserProfileWithRelationsSchema: z.ZodObject<any> = UserProfileSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  tenant: z.lazy(() => TenantWithRelationsSchema),
}))

/////////////////////////////////////////
// AUDITS SCHEMA
/////////////////////////////////////////

export const AuditsSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  auditId: z.number().int().openapi({"title":"关联"}),
  auditType: z.string().openapi({"title":"审计类型(关联"}),
  userId: z.string().openapi({"title":"用户"}),
  username: z.string().nullable().openapi({"title":"用户名"}),
  action: z.string().openapi({"title":"动作(e.g."}),
  auditChanges: z.string().openapi({"title":"变化"}),
  version: z.number().int().openapi({"title":"版本"}),
}).openapi({"display_name":"审计日志"})

export type Audits = z.infer<typeof AuditsSchema>

/////////////////////////////////////////
// DYNAMIC TABLE DEF SCHEMA
/////////////////////////////////////////

export const DynamicTableDefSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  name: z.string().openapi({"title":"表英文名"}),
  extendedSchema: NullableJsonValue.optional(),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
}).openapi({"display_name":"动态表定义","display_column":"name"})

export type DynamicTableDef = z.infer<typeof DynamicTableDefSchema>

// DYNAMIC TABLE DEF RELATION SCHEMA
//------------------------------------------------------

export type DynamicTableDefRelations = {
  dynamicTableDefColumns: DynamicTableDefColumnWithRelations[];
  dynamicTableData: DynamicTableDataWithRelations[];
  tenant: TenantWithRelations;
};

export type DynamicTableDefWithRelations = Omit<z.infer<typeof DynamicTableDefSchema>, "extendedSchema"> & {
  extendedSchema?: NullableJsonInput;
} & DynamicTableDefRelations

export const DynamicTableDefWithRelationsSchema: z.ZodObject<any> = DynamicTableDefSchema.merge(z.object({
  dynamicTableDefColumns: z.lazy(() => DynamicTableDefColumnWithRelationsSchema).array().openapi({"model_name":"DynamicTableDefColumn"}),
  dynamicTableData: z.lazy(() => DynamicTableDataWithRelationsSchema).array().openapi({"model_name":"DynamicTableData"}),
  tenant: z.lazy(() => TenantWithRelationsSchema),
}))

/////////////////////////////////////////
// DYNAMIC TABLE DEF COLUMN SCHEMA
/////////////////////////////////////////

export const DynamicTableDefColumnSchema = z.object({
  type: DynamicColumnTypeSchema.openapi({"title":"类型"}),
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  dynamicTableDefId: z.number().int().openapi({"reference":"DynamicTableDef"}),
  name: z.string().openapi({"title":"列名"}),
  extendedSchema: NullableJsonValue.optional(),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
}).openapi({"display_name":"动态表列定义","display_column":"name"})

export type DynamicTableDefColumn = z.infer<typeof DynamicTableDefColumnSchema>

// DYNAMIC TABLE DEF COLUMN RELATION SCHEMA
//------------------------------------------------------

export type DynamicTableDefColumnRelations = {
  dynamicTableDef: DynamicTableDefWithRelations;
  tenant: TenantWithRelations;
};

export type DynamicTableDefColumnWithRelations = Omit<z.infer<typeof DynamicTableDefColumnSchema>, "extendedSchema"> & {
  extendedSchema?: NullableJsonInput;
} & DynamicTableDefColumnRelations

export const DynamicTableDefColumnWithRelationsSchema: z.ZodObject<any> = DynamicTableDefColumnSchema.merge(z.object({
  dynamicTableDef: z.lazy(() => DynamicTableDefWithRelationsSchema),
  tenant: z.lazy(() => TenantWithRelationsSchema),
}))

/////////////////////////////////////////
// DYNAMIC TABLE DATA SCHEMA
/////////////////////////////////////////

export const DynamicTableDataSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  dynamicTableDefId: z.number().int().openapi({"reference":"DynamicTableDef"}),
  data: InputJsonValue,
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
}).openapi({"display_name":"动态表数据"})

export type DynamicTableData = z.infer<typeof DynamicTableDataSchema>

// DYNAMIC TABLE DATA RELATION SCHEMA
//------------------------------------------------------

export type DynamicTableDataRelations = {
  dynamicTableDef: DynamicTableDefWithRelations;
  tenant: TenantWithRelations;
};

export type DynamicTableDataWithRelations = z.infer<typeof DynamicTableDataSchema> & DynamicTableDataRelations

export const DynamicTableDataWithRelationsSchema: z.ZodObject<any> = DynamicTableDataSchema.merge(z.object({
  dynamicTableDef: z.lazy(() => DynamicTableDefWithRelationsSchema),
  tenant: z.lazy(() => TenantWithRelationsSchema),
}))

/////////////////////////////////////////
// MENU SCHEMA
/////////////////////////////////////////

export const MenuSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  treeData: InputJsonValue,
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
}).openapi({"display_name":"菜单","display_column":"name"})

export type Menu = z.infer<typeof MenuSchema>

// MENU RELATION SCHEMA
//------------------------------------------------------

export type MenuRelations = {
  tenant: TenantWithRelations;
};

export type MenuWithRelations = z.infer<typeof MenuSchema> & MenuRelations

export const MenuWithRelationsSchema: z.ZodObject<any> = MenuSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema),
}))

/////////////////////////////////////////
// SENT SMS SCHEMA
/////////////////////////////////////////

export const SentSmsSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  mobile: z.string(),
  code: z.string(),
}).openapi({"display_name":"已发送短信","display_column":"name"})

export type SentSms = z.infer<typeof SentSmsSchema>

/////////////////////////////////////////
// WEIXIN PROFILE SCHEMA
/////////////////////////////////////////

export const WeixinProfileSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  unionOrOpenid: z.string(),
  unionid: z.string().nullable().openapi({"title":"微信"}),
  loginOpenid: z.string().nullable().openapi({"title":"微信"}),
  headimgurl: z.string().nullable(),
  nickname: z.string().nullable(),
  sex: z.number().int().nullable(),
}).openapi({"primary_key":"id","display_name":"微信用户信息","display_column":"nickname"})

export type WeixinProfile = z.infer<typeof WeixinProfileSchema>

// WEIXIN PROFILE RELATION SCHEMA
//------------------------------------------------------

export type WeixinProfileRelations = {
  users: UserWithRelations[];
};

export type WeixinProfileWithRelations = z.infer<typeof WeixinProfileSchema> & WeixinProfileRelations

export const WeixinProfileWithRelationsSchema: z.ZodObject<any> = WeixinProfileSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array().openapi({"model_name":"User"}),
}))

/////////////////////////////////////////
// ORDER PROFILE SCHEMA
/////////////////////////////////////////

export const OrderProfileSchema = z.object({
  productType: ProductTypeSchema,
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
  userId: z.number().int(),
  plan: z.number().int().nullable(),
  amount: z.number().int().nullable().openapi({"title":"额度"}),
  expireAt: z.date().nullable(),
}).openapi({"primary_key":"id","display_name":"用户订单信息","display_column":"productType"})

export type OrderProfile = z.infer<typeof OrderProfileSchema>

// ORDER PROFILE RELATION SCHEMA
//------------------------------------------------------

export type OrderProfileRelations = {
  tenant: TenantWithRelations;
  user: UserWithRelations;
};

export type OrderProfileWithRelations = z.infer<typeof OrderProfileSchema> & OrderProfileRelations

export const OrderProfileWithRelationsSchema: z.ZodObject<any> = OrderProfileSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
}))

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  productType: ProductTypeSchema,
  id: z.number().int(),
  uid: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
  name: z.string().openapi({"title":"产品名"}),
  /**
   * @schema.override_type integer
   */
  price: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'price' must be a Decimal. Location: ['Models', 'Product']",  }).openapi({"title":"价格","override_type":"integer"}),
  plan: z.number().int().nullable(),
  amount: z.number().int().openapi({"title":"额度"}),
  extendedDescriptionData: NullableJsonValue.optional(),
  fileSize: z.string().nullable(),
  storeDuration: z.number().int().nullable(),
  hasAds: z.string().nullable().openapi({"title":"广告"}),
  tecSupport: z.string().nullable().openapi({"title":"技术支持"}),
  validityPeriod: z.number().int().nullable().openapi({"title":"有效期/天"}),
  restricted: z.number().int(),
}).openapi({"primary_key":"id","searchable_columns":"id,name","display_name":"产品","display_column":"name"})

export type Product = z.infer<typeof ProductSchema>

// PRODUCT RELATION SCHEMA
//------------------------------------------------------

export type ProductRelations = {
  tenant: TenantWithRelations;
  productSnapshots: ProductSnapshotWithRelations[];
};

export type ProductWithRelations = Omit<z.infer<typeof ProductSchema>, "extendedDescriptionData"> & {
  extendedDescriptionData?: NullableJsonInput;
} & ProductRelations

export const ProductWithRelationsSchema: z.ZodObject<any> = ProductSchema.merge(z.object({
  tenant: z.lazy(() => TenantWithRelationsSchema),
  productSnapshots: z.lazy(() => ProductSnapshotWithRelationsSchema).array().openapi({"model_name":"ProductSnapshot","foreign_key":"productId","primary_key":"id"}),
}))

/////////////////////////////////////////
// PRODUCT SNAPSHOT SCHEMA
/////////////////////////////////////////

export const ProductSnapshotSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.number().int().openapi({"reference":"User"}),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
  snapshotPrice: z.union([z.number(),z.string(),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: "Field 'snapshotPrice' must be a Decimal. Location: ['Models', 'ProductSnapshot']",  }),
  orderId: z.number().int(),
  productId: z.number().int(),
})

export type ProductSnapshot = z.infer<typeof ProductSnapshotSchema>

// PRODUCT SNAPSHOT RELATION SCHEMA
//------------------------------------------------------

export type ProductSnapshotRelations = {
  user: UserWithRelations;
  tenant: TenantWithRelations;
  order: OrderWithRelations;
  product: ProductWithRelations;
};

export type ProductSnapshotWithRelations = z.infer<typeof ProductSnapshotSchema> & ProductSnapshotRelations

export const ProductSnapshotWithRelationsSchema: z.ZodObject<any> = ProductSnapshotSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  tenant: z.lazy(() => TenantWithRelationsSchema),
  order: z.lazy(() => OrderWithRelationsSchema),
  product: z.lazy(() => ProductWithRelationsSchema),
}))

/////////////////////////////////////////
// ORDER SCHEMA
/////////////////////////////////////////

export const OrderSchema = z.object({
  status: OrderStatusSchema,
  id: z.number().int(),
  uid: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.number().int().openapi({"reference":"User"}),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
  serial: z.number().int(),
}).openapi({"primary_key":"id","display_name":"订单","display_primary_key":"true"})

export type Order = z.infer<typeof OrderSchema>

// ORDER RELATION SCHEMA
//------------------------------------------------------

export type OrderRelations = {
  user: UserWithRelations;
  tenant: TenantWithRelations;
  pay?: PayWithRelations | null;
  productSnapshots: ProductSnapshotWithRelations[];
};

export type OrderWithRelations = z.infer<typeof OrderSchema> & OrderRelations

export const OrderWithRelationsSchema: z.ZodObject<any> = OrderSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  tenant: z.lazy(() => TenantWithRelationsSchema),
  pay: z.lazy(() => PayWithRelationsSchema).nullable(),
  productSnapshots: z.lazy(() => ProductSnapshotWithRelationsSchema).array().openapi({"model_name":"ProductSnapshot"}),
}))

/////////////////////////////////////////
// PAY SCHEMA
/////////////////////////////////////////

export const PaySchema = z.object({
  status: PayStatusSchema,
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
  userId: z.number().int().openapi({"reference":"User"}),
  tenantId: z.number().int().openapi({"reference":"Tenant"}),
  orderId: z.number().int(),
  transactionId: z.string(),
})

export type Pay = z.infer<typeof PaySchema>

// PAY RELATION SCHEMA
//------------------------------------------------------

export type PayRelations = {
  user: UserWithRelations;
  tenant: TenantWithRelations;
  Order: OrderWithRelations;
};

export type PayWithRelations = z.infer<typeof PaySchema> & PayRelations

export const PayWithRelationsSchema: z.ZodObject<any> = PaySchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  tenant: z.lazy(() => TenantWithRelationsSchema),
  Order: z.lazy(() => OrderWithRelationsSchema),
}))

/////////////////////////////////////////
// REQUEST ERROR LOG SCHEMA
/////////////////////////////////////////

export const RequestErrorLogSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  isDeleted: z.boolean(),
  requestId: z.string(),
  tenantId: z.number().int().nullable(),
  userId: z.number().int().nullable(),
  log: InputJsonValue,
})

export type RequestErrorLog = z.infer<typeof RequestErrorLogSchema>
