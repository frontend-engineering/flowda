
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.16.2
 * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
 */
Prisma.prismaVersion = {
  client: "4.16.2",
  engine: "4bc8b6e1b66cb932731fb1bdbbc550d1e010de81"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  name: 'name',
  hashedPassword: 'hashedPassword',
  hashedRefreshToken: 'hashedRefreshToken',
  displayName: 'displayName'
};

exports.Prisma.TaskFormRelationScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  taskDefinitionKey: 'taskDefinitionKey',
  formKey: 'formKey'
};

exports.Prisma.TableFilterScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  path: 'path',
  name: 'name',
  filterJSON: 'filterJSON'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  username: 'username',
  hashedPassword: 'hashedPassword',
  hashedRefreshToken: 'hashedRefreshToken',
  recoveryCode: 'recoveryCode',
  recoveryToken: 'recoveryToken',
  email: 'email',
  mobile: 'mobile',
  anonymousCustomerToken: 'anonymousCustomerToken',
  image: 'image',
  tenantId: 'tenantId',
  weixinProfileId: 'weixinProfileId'
};

exports.Prisma.UserPreSignupScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  email: 'email',
  verifyCode: 'verifyCode',
  tenantId: 'tenantId'
};

exports.Prisma.UserProfileScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  userId: 'userId',
  fullName: 'fullName',
  tenantId: 'tenantId'
};

exports.Prisma.AuditsScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  auditId: 'auditId',
  auditType: 'auditType',
  userId: 'userId',
  username: 'username',
  action: 'action',
  auditChanges: 'auditChanges',
  version: 'version'
};

exports.Prisma.DynamicTableDefScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  name: 'name',
  extendedSchema: 'extendedSchema',
  tenantId: 'tenantId'
};

exports.Prisma.DynamicTableDefColumnScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  dynamicTableDefId: 'dynamicTableDefId',
  name: 'name',
  type: 'type',
  extendedSchema: 'extendedSchema',
  tenantId: 'tenantId'
};

exports.Prisma.DynamicTableDataScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  dynamicTableDefId: 'dynamicTableDefId',
  data: 'data',
  tenantId: 'tenantId'
};

exports.Prisma.MenuScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  treeData: 'treeData',
  tenantId: 'tenantId'
};

exports.Prisma.SentSmsScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  mobile: 'mobile',
  code: 'code'
};

exports.Prisma.WeixinProfileScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  unionOrOpenid: 'unionOrOpenid',
  unionid: 'unionid',
  loginOpenid: 'loginOpenid',
  headimgurl: 'headimgurl',
  nickname: 'nickname',
  sex: 'sex'
};

exports.Prisma.OrderProfileScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  tenantId: 'tenantId',
  userId: 'userId',
  productType: 'productType',
  plan: 'plan',
  amount: 'amount',
  expireAt: 'expireAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  uid: 'uid',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  tenantId: 'tenantId',
  name: 'name',
  price: 'price',
  productType: 'productType',
  plan: 'plan',
  amount: 'amount',
  extendedDescriptionData: 'extendedDescriptionData',
  fileSize: 'fileSize',
  storeDuration: 'storeDuration',
  hasAds: 'hasAds',
  tecSupport: 'tecSupport',
  validityPeriod: 'validityPeriod',
  restricted: 'restricted'
};

exports.Prisma.ProductSnapshotScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  userId: 'userId',
  tenantId: 'tenantId',
  snapshotPrice: 'snapshotPrice',
  orderId: 'orderId',
  productId: 'productId'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  uid: 'uid',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  userId: 'userId',
  tenantId: 'tenantId',
  serial: 'serial',
  status: 'status'
};

exports.Prisma.PayScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isDeleted: 'isDeleted',
  userId: 'userId',
  tenantId: 'tenantId',
  status: 'status',
  orderId: 'orderId',
  transactionId: 'transactionId'
};

exports.Prisma.RequestErrorLogScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  isDeleted: 'isDeleted',
  requestId: 'requestId',
  tenantId: 'tenantId',
  userId: 'userId',
  log: 'log'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.DynamicColumnType = {
  string: 'string',
  textarea: 'textarea',
  integer: 'integer',
  boolean: 'boolean',
  datetime: 'datetime',
  tag: 'tag',
  reference: 'reference'
};

exports.ProductType = {
  AMOUNT: 'AMOUNT',
  PLAN: 'PLAN'
};

exports.OrderStatus = {
  INITIALIZED: 'INITIALIZED',
  PAY_ASSOCIATED: 'PAY_ASSOCIATED',
  FREE_DEAL: 'FREE_DEAL',
  CANCELED: 'CANCELED'
};

exports.PayStatus = {
  UNPAIED: 'UNPAIED',
  PAIED: 'PAIED',
  REFUND: 'REFUND'
};

exports.Prisma.ModelName = {
  Tenant: 'Tenant',
  TaskFormRelation: 'TaskFormRelation',
  TableFilter: 'TableFilter',
  User: 'User',
  UserPreSignup: 'UserPreSignup',
  UserProfile: 'UserProfile',
  Audits: 'Audits',
  DynamicTableDef: 'DynamicTableDef',
  DynamicTableDefColumn: 'DynamicTableDefColumn',
  DynamicTableData: 'DynamicTableData',
  Menu: 'Menu',
  SentSms: 'SentSms',
  WeixinProfile: 'WeixinProfile',
  OrderProfile: 'OrderProfile',
  Product: 'Product',
  ProductSnapshot: 'ProductSnapshot',
  Order: 'Order',
  Pay: 'Pay',
  RequestErrorLog: 'RequestErrorLog'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
