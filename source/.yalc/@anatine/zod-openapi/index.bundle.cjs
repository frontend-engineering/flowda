'use strict';

var merge = require('ts-deepmerge');
var zod = require('zod');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var merge__default = /*#__PURE__*/_interopDefault(merge);

function extendApi(schema, SchemaObject = {}) {
    const openapi = Object.assign(Object.assign({}, schema._def.openapi), SchemaObject);
    const newSchema = new schema.constructor(Object.assign(Object.assign({}, schema._def), { openapi: openapi /* for zod-openapi */ }));
    return newSchema;
}
function iterateZodObject({ zodRef, useOutput, }) {
    return Object.keys(zodRef.shape).reduce((carry, key) => (Object.assign(Object.assign({}, carry), { [key]: generateSchema(zodRef.shape[key], useOutput) })), {});
}
function parseTransformation({ zodRef, schemas, useOutput, }) {
    const input = generateSchema(zodRef._def.schema, useOutput);
    let output = 'undefined';
    if (useOutput && zodRef._def.effect) {
        const effect = zodRef._def.effect.type === 'transform' ? zodRef._def.effect : null;
        if (effect && 'transform' in effect) {
            try {
                output = typeof effect.transform(['integer', 'number'].includes(`${input.type}`)
                    ? 0
                    : 'string' === input.type
                        ? ''
                        : 'boolean' === input.type
                            ? false
                            : 'object' === input.type
                                ? {}
                                : 'null' === input.type
                                    ? null
                                    : 'array' === input.type
                                        ? []
                                        : undefined, { addIssue: () => undefined, path: [] } // TODO: Discover if context is necessary here
                );
            }
            catch (e) {
                /**/
            }
        }
    }
    return merge__default.default(Object.assign(Object.assign(Object.assign({}, (zodRef.description ? { description: zodRef.description } : {})), input), (['number', 'string', 'boolean', 'null'].includes(output)
        ? {
            type: output,
        }
        : {})), ...schemas);
}
function parseString({ zodRef, schemas, }) {
    const baseSchema = {
        type: 'string',
    };
    const { checks = [] } = zodRef._def;
    checks.forEach((item) => {
        switch (item.kind) {
            case 'email':
                baseSchema.format = 'email';
                break;
            case 'uuid':
                baseSchema.format = 'uuid';
                break;
            case 'cuid':
                baseSchema.format = 'cuid';
                break;
            case 'url':
                baseSchema.format = 'uri';
                break;
            case 'datetime':
                baseSchema.format = 'date-time';
                break;
            case 'length':
                baseSchema.minLength = item.value;
                baseSchema.maxLength = item.value;
                break;
            case 'max':
                baseSchema.maxLength = item.value;
                break;
            case 'min':
                baseSchema.minLength = item.value;
                break;
            case 'regex':
                baseSchema.pattern = item.regex.source;
                break;
        }
    });
    return merge__default.default(baseSchema, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseNumber({ zodRef, schemas, }) {
    const baseSchema = {
        type: 'number',
    };
    const { checks = [] } = zodRef._def;
    checks.forEach((item) => {
        switch (item.kind) {
            case 'max':
                baseSchema.maximum = item.value;
                // TODO: option to make this always explicit? (false instead of non-existent)
                if (!item.inclusive)
                    baseSchema.exclusiveMaximum = true;
                break;
            case 'min':
                baseSchema.minimum = item.value;
                if (!item.inclusive)
                    baseSchema.exclusiveMinimum = true;
                break;
            case 'int':
                baseSchema.type = 'integer';
                break;
            case 'multipleOf':
                baseSchema.multipleOf = item.value;
        }
    });
    return merge__default.default(baseSchema, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseObject({ zodRef, schemas, useOutput, }) {
    var _a;
    let additionalProperties;
    // `catchall` obviates `strict`, `strip`, and `passthrough`
    if (!(zodRef._def.catchall instanceof zod.z.ZodNever ||
        ((_a = zodRef._def.catchall) === null || _a === void 0 ? void 0 : _a._def.typeName) === 'ZodNever'))
        additionalProperties = generateSchema(zodRef._def.catchall, useOutput);
    else if (zodRef._def.unknownKeys === 'passthrough')
        additionalProperties = true;
    else if (zodRef._def.unknownKeys === 'strict')
        additionalProperties = false;
    // So that `undefined` values don't end up in the schema and be weird
    additionalProperties = additionalProperties != null ? { additionalProperties } : {};
    const requiredProperties = Object.keys(zodRef.shape).filter((key) => {
        const item = zodRef.shape[key];
        return (!(item.isOptional() ||
            item instanceof zod.z.ZodDefault ||
            item._def.typeName === 'ZodDefault') &&
            !(item instanceof zod.z.ZodNever || item._def.typeName === 'ZodDefault'));
    });
    const required = requiredProperties.length > 0 ? { required: requiredProperties } : {};
    return merge__default.default(Object.assign(Object.assign({ type: 'object', properties: iterateZodObject({
            zodRef: zodRef,
            schemas,
            useOutput,
        }) }, required), additionalProperties), zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseRecord({ zodRef, schemas, useOutput, }) {
    return merge__default.default({
        type: 'object',
        additionalProperties: zodRef._def.valueType instanceof zod.z.ZodUnknown
            ? {}
            : generateSchema(zodRef._def.valueType, useOutput),
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseBigInt({ zodRef, schemas, }) {
    return merge__default.default({ type: 'integer', format: 'int64' }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseBoolean({ zodRef, schemas, }) {
    return merge__default.default({ type: 'boolean' }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseDate({ zodRef, schemas }) {
    return merge__default.default({ type: 'string', format: 'date-time' }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseNull({ zodRef, schemas }) {
    return merge__default.default({
        type: 'string',
        format: 'null',
        nullable: true,
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseOptionalNullable({ schemas, zodRef, useOutput, }) {
    return merge__default.default(generateSchema(zodRef.unwrap(), useOutput), zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseDefault({ schemas, zodRef, useOutput, }) {
    return merge__default.default(Object.assign({ default: zodRef._def.defaultValue() }, generateSchema(zodRef._def.innerType, useOutput)), zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseArray({ schemas, zodRef, useOutput, }) {
    const constraints = {};
    if (zodRef._def.exactLength != null) {
        constraints.minItems = zodRef._def.exactLength.value;
        constraints.maxItems = zodRef._def.exactLength.value;
    }
    if (zodRef._def.minLength != null)
        constraints.minItems = zodRef._def.minLength.value;
    if (zodRef._def.maxLength != null)
        constraints.maxItems = zodRef._def.maxLength.value;
    return merge__default.default(Object.assign({ type: 'array', items: generateSchema(zodRef.element, useOutput) }, constraints), zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseLiteral({ schemas, zodRef, }) {
    return merge__default.default({
        type: typeof zodRef._def.value,
        enum: [zodRef._def.value],
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseEnum({ schemas, zodRef, }) {
    return merge__default.default({
        type: typeof Object.values(zodRef._def.values)[0],
        enum: Object.values(zodRef._def.values),
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseIntersection({ schemas, zodRef, useOutput, }) {
    return merge__default.default({
        allOf: [
            generateSchema(zodRef._def.left, useOutput),
            generateSchema(zodRef._def.right, useOutput),
        ],
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseUnion({ schemas, zodRef, useOutput, }) {
    return merge__default.default({
        oneOf: zodRef._def.options.map((schema) => generateSchema(schema, useOutput)),
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseDiscriminatedUnion({ schemas, zodRef, useOutput, }) {
    return merge__default.default({
        discriminator: {
            propertyName: zodRef._def.discriminator,
        },
        oneOf: Array.from(zodRef._def.options.values()).map((schema) => generateSchema(schema, useOutput)),
    }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseNever({ zodRef, schemas, }) {
    return merge__default.default({ readOnly: true }, zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
function parseBranded({ schemas, zodRef, }) {
    return merge__default.default(generateSchema(zodRef._def.type), ...schemas);
}
function catchAllParser({ zodRef, schemas, }) {
    return merge__default.default(zodRef.description ? { description: zodRef.description } : {}, ...schemas);
}
const workerMap = {
    ZodObject: parseObject,
    ZodRecord: parseRecord,
    ZodString: parseString,
    ZodNumber: parseNumber,
    ZodBigInt: parseBigInt,
    ZodBoolean: parseBoolean,
    ZodDate: parseDate,
    ZodNull: parseNull,
    ZodOptional: parseOptionalNullable,
    ZodNullable: parseOptionalNullable,
    ZodDefault: parseDefault,
    ZodArray: parseArray,
    ZodLiteral: parseLiteral,
    ZodEnum: parseEnum,
    ZodNativeEnum: parseEnum,
    ZodTransformer: parseTransformation,
    ZodEffects: parseTransformation,
    ZodIntersection: parseIntersection,
    ZodUnion: parseUnion,
    ZodDiscriminatedUnion: parseDiscriminatedUnion,
    ZodNever: parseNever,
    ZodBranded: parseBranded,
    // TODO Transform the rest to schemas
    ZodUndefined: catchAllParser,
    // TODO: `prefixItems` is allowed in OpenAPI 3.1 which can be used to create tuples
    ZodTuple: catchAllParser,
    ZodMap: catchAllParser,
    ZodFunction: catchAllParser,
    ZodLazy: catchAllParser,
    ZodPromise: catchAllParser,
    ZodAny: catchAllParser,
    ZodUnknown: catchAllParser,
    ZodVoid: catchAllParser,
};
function generateSchema(zodRef, useOutput) {
    const { openapi = {} } = zodRef._def;
    const schemas = [
        zodRef.isNullable && zodRef.isNullable() ? { nullable: true } : {},
        ...(Array.isArray(openapi) ? openapi : [openapi]),
    ];
    try {
        const typeName = zodRef._def.typeName;
        if (typeName in workerMap) {
            return workerMap[typeName]({
                zodRef: zodRef,
                schemas,
                useOutput,
            });
        }
        return catchAllParser({ zodRef, schemas });
    }
    catch (err) {
        console.error(err);
        return catchAllParser({ zodRef, schemas });
    }
}

exports.extendApi = extendApi;
exports.generateSchema = generateSchema;
