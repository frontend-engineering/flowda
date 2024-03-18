export const PrismaSchemaServiceSymbol = Symbol.for('PrismaSchemaService');
export const SchemaTransformerSymbol = Symbol.for('SchemaTransformer');
export const PrismaUtilsSymbol = Symbol.for('PrismaUtils');
export const DataServiceSymbol = Symbol.for('DataService');
export const SchemaServiceSymbol = Symbol.for('SchemaService');
export const DynamicTableSchemaTransformerSymbol = Symbol.for('DynamicTableSchemaTransformer');
export const FlowdaTrpcClientSymbol = Symbol.for('FlowdaTrpcClient');
export const FlowdaGatewayTrpcClientSymbol = Symbol.for('FlowdaGatewayTrpcClient');
export const PrismaClientSymbol = Symbol('PrismaClient');
/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
export const ServiceSymbol = Symbol('Service');
export const APISymbol = Symbol('API');
export const URLSymbol = Symbol.for('URL');
export const ENVSymbol = Symbol.for('ENV');
export const PrismaZodSchemaSymbol = Symbol.for('PrismaZodSchema');
export const CustomZodSchemaSymbol = Symbol.for('CustomZodSchema');
export const K3CloudIdentifyInfoSymbol = Symbol.for('K3CloudIdentifyInfo');
export const COSSymbol = Symbol('COS');
export const SmsClientSymbol = Symbol.for('SmsClient');
export const WechatOAuthSymbol = Symbol.for('WechatOAuth');
export const DynamicTableDataServiceSymbol = Symbol.for('DynamicTableDataService');
export const DynamicTableDefServiceSymbol = Symbol.for('DynamicTableDefService');
export const MenuServiceSymbol = Symbol.for('MenuService');
export const WechatpayNodeV3Symbol = Symbol.for('WechatpayNodeV3Symbol');
export const WechatpayNodeV3FactorySymbol = Symbol.for('WechatpayNodeV3FactorySymbol');
export const GridModelSymbol = Symbol.for('GridModel');
export const LoginModelSymbol = Symbol.for('LoginModel');
//# sourceMappingURL=symbols.js.map