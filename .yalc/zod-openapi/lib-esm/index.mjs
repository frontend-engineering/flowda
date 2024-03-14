var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/zodType.ts
var isZodType = (zodType, typeName) => zodType?._def?.typeName === typeName;
var isAnyZodType = (zodType) => Boolean(
  zodType?._def?.typeName
);

// src/create/schema/metadata.ts
var enhanceWithMetadata = (schema, metadata) => {
  if (schema.type === "ref") {
    if (Object.values(metadata).every((val) => val === void 0)) {
      return schema;
    }
    return {
      type: "schema",
      schema: {
        allOf: [schema.schema, metadata]
      },
      effects: schema.effects
    };
  }
  return {
    type: "schema",
    schema: {
      ...schema.schema,
      ...metadata
    },
    effects: schema.effects
  };
};

// src/create/schema/parsers/array.ts
var createArraySchema = (zodArray, state) => {
  const zodType = zodArray._def.type;
  const minItems = zodArray._def.exactLength?.value ?? zodArray._def.minLength?.value;
  const maxItems = zodArray._def.exactLength?.value ?? zodArray._def.maxLength?.value;
  const items = createSchemaObject(zodType, state, ["array items"]);
  return {
    type: "schema",
    schema: {
      type: "array",
      items: items.schema,
      ...minItems !== void 0 && { minItems },
      ...maxItems !== void 0 && { maxItems }
    },
    effects: items.effects
  };
};

// src/create/schema/parsers/boolean.ts
var createBooleanSchema = (_zodBoolean) => ({
  type: "schema",
  schema: {
    type: "boolean"
  }
});

// src/create/schema/parsers/brand.ts
var createBrandedSchema = (zodBranded, state) => createSchemaObject(zodBranded._def.type, state, ["brand"]);

// src/create/schema/parsers/catch.ts
var createCatchSchema = (zodCatch, state) => createSchemaObject(zodCatch._def.innerType, state, ["catch"]);

// src/create/schema/parsers/date.ts
var createDateSchema = (_zodDate) => ({
  type: "schema",
  schema: {
    type: "string"
  }
});

// src/create/schema/parsers/default.ts
var createDefaultSchema = (zodDefault, state) => {
  const schemaObject = createSchemaObject(zodDefault._def.innerType, state, [
    "default"
  ]);
  return enhanceWithMetadata(schemaObject, {
    default: zodDefault._def.defaultValue()
  });
};

// src/create/schema/parsers/transform.ts
var createTransformSchema = (zodTransform, state) => {
  if (zodTransform._def.openapi?.effectType === "output") {
    return {
      type: "schema",
      schema: createManualOutputTransformSchema(zodTransform, state)
    };
  }
  if (zodTransform._def.openapi?.effectType === "input" || zodTransform._def.openapi?.effectType === "same") {
    return createSchemaObject(zodTransform._def.schema, state, [
      "transform input"
    ]);
  }
  if (state.type === "output") {
    return {
      type: "schema",
      schema: createManualOutputTransformSchema(zodTransform, state)
    };
  }
  const schema = createSchemaObject(zodTransform._def.schema, state, [
    "transform input"
  ]);
  return {
    ...schema,
    effects: flattenEffects([
      [
        {
          type: "schema",
          creationType: "input",
          zodType: zodTransform,
          path: [...state.path]
        }
      ],
      schema.effects
    ])
  };
};
var createManualOutputTransformSchema = (zodTransform, state) => {
  if (!zodTransform._def.openapi?.type) {
    const zodType = zodTransform.constructor.name;
    const schemaName = `${zodType} - ${zodTransform._def.effect.type}`;
    throw new Error(
      `Failed to determine a type for ${schemaName} at ${state.path.join(
        " > "
      )}. Please change the 'effectType' to 'input', wrap it in a ZodPipeline or assign it a manual 'type'.`
    );
  }
  return {
    type: zodTransform._def.openapi.type
  };
};
var getZodTypeName = (zodType) => {
  if (isZodType(zodType, "ZodEffects")) {
    return `${zodType._def.typeName} - ${zodType._def.effect.type}`;
  }
  return zodType._def.typeName;
};
var throwTransformError = (effect) => {
  const typeName = getZodTypeName(effect.zodType);
  const input = effect.creationType;
  const opposite = input === "input" ? "output" : "input";
  throw new Error(
    `The ${typeName} at ${effect.path.join(
      " > "
    )} is used within a registered compoment schema${effect.component ? ` (${effect.component.ref})` : ""} and contains an ${input} transformation${effect.component ? ` (${getZodTypeName(
      effect.component.zodType
    )}) defined at ${effect.component.path.join(" > ")}` : ""} which is also used in an ${opposite} schema.

This may cause the schema to render incorrectly and is most likely a mistake. You can resolve this by:

1. Setting an \`effectType\` on one of the transformations to \`same\` (Not applicable for ZodDefault), \`input\` or \`output\` eg. \`.openapi({type: 'same'})\`
2. Wrapping the transformation in a ZodPipeline
3. Assigning a manual type to the transformation eg. \`.openapi({type: 'string'})\`
4. Removing the transformation
5. Deregister the component containing the transformation`
  );
};
var resolveSingleEffect = (effect, state) => {
  if (effect.type === "schema") {
    return {
      creationType: effect.creationType,
      path: effect.path,
      zodType: effect.zodType
    };
  }
  if (effect.type === "component") {
    if (state.visited.has(effect.zodType)) {
      return;
    }
    const component = state.components.schemas.get(effect.zodType);
    if (component?.type !== "complete") {
      throw new Error("Something went wrong, component schema is not complete");
    }
    if (component.resolvedEffect) {
      return {
        creationType: component.resolvedEffect.creationType,
        path: effect.path,
        zodType: effect.zodType,
        component: {
          ref: component.ref,
          zodType: component.resolvedEffect.zodType,
          path: component.resolvedEffect.path
        }
      };
    }
    if (!component.effects) {
      return void 0;
    }
    state.visited.add(effect.zodType);
    const resolved = resolveEffect(component.effects, state);
    state.visited.delete(effect.zodType);
    if (!resolved) {
      return void 0;
    }
    component.resolvedEffect = resolved;
    return resolved;
  }
  return void 0;
};
var resolveEffect = (effects, state) => {
  const { input, output } = effects.reduce(
    (acc, effect) => {
      const resolvedSchemaEffect = resolveSingleEffect(effect, state);
      if (resolvedSchemaEffect?.creationType === "input") {
        acc.input.push(resolvedSchemaEffect);
      }
      if (resolvedSchemaEffect?.creationType === "output") {
        acc.output.push(resolvedSchemaEffect);
      }
      if (resolvedSchemaEffect && acc.input.length > 1 && acc.output.length > 1) {
        throwTransformError(resolvedSchemaEffect);
      }
      return acc;
    },
    { input: [], output: [] }
  );
  if (input.length > 0) {
    return input[0];
  }
  if (output.length > 0) {
    return output[0];
  }
  return void 0;
};
var verifyEffects = (effects, state) => {
  const resolved = resolveEffect(effects, state);
  if (resolved?.creationType && resolved.creationType !== state.type) {
    throwTransformError(resolved);
  }
};
var flattenEffects = (effects) => {
  const allEffects = effects.reduce((acc, effect) => {
    if (effect) {
      return acc.concat(effect);
    }
    return acc;
  }, []);
  return allEffects.length ? allEffects : void 0;
};

// src/create/schema/parsers/discriminatedUnion.ts
var createDiscriminatedUnionSchema = (zodDiscriminatedUnion, state) => {
  const options = zodDiscriminatedUnion.options;
  const schemas = options.map(
    (option, index) => createSchemaObject(option, state, [`discriminated union option ${index}`])
  );
  const schemaObjects = schemas.map((schema) => schema.schema);
  const discriminator = mapDiscriminator(
    schemaObjects,
    options,
    zodDiscriminatedUnion.discriminator,
    state
  );
  return {
    type: "schema",
    schema: {
      oneOf: schemaObjects,
      ...discriminator && { discriminator }
    },
    effects: flattenEffects(schemas.map((schema) => schema.effects))
  };
};
var mapDiscriminator = (schemas, zodObjects, discriminator, state) => {
  if (typeof discriminator !== "string") {
    return void 0;
  }
  const mapping = {};
  for (const [index, zodObject] of zodObjects.entries()) {
    const schema = schemas[index];
    const componentSchemaRef = "$ref" in schema ? schema?.$ref : void 0;
    if (!componentSchemaRef) {
      return void 0;
    }
    const value = zodObject.shape[discriminator];
    if (isZodType(value, "ZodEnum")) {
      for (const enumValue of value._def.values) {
        mapping[enumValue] = componentSchemaRef;
      }
      continue;
    }
    const literalValue = (value?._def).value;
    if (typeof literalValue !== "string") {
      throw new Error(
        `Discriminator ${discriminator} could not be found in on index ${index} of a discriminated union at ${state.path.join(
          " > "
        )}`
      );
    }
    mapping[literalValue] = componentSchemaRef;
  }
  return {
    propertyName: discriminator,
    mapping
  };
};

// src/create/schema/parsers/enum.ts
var createEnumSchema = (zodEnum) => ({
  type: "schema",
  schema: {
    type: "string",
    enum: zodEnum._def.values
  }
});

// src/create/schema/parsers/intersection.ts
var createIntersectionSchema = (zodIntersection, state) => {
  const left = createSchemaObject(zodIntersection._def.left, state, [
    "intersection left"
  ]);
  const right = createSchemaObject(zodIntersection._def.right, state, [
    "intersection right"
  ]);
  return {
    type: "schema",
    schema: {
      allOf: [left.schema, right.schema]
    },
    effects: flattenEffects([left.effects, right.effects])
  };
};

// src/create/schema/parsers/lazy.ts
var createLazySchema = (zodLazy, state) => {
  const innerSchema = zodLazy._def.getter();
  return createSchemaObject(innerSchema, state, ["lazy schema"]);
};

// src/create/schema/parsers/literal.ts
var createLiteralSchema = (zodLiteral) => ({
  type: "schema",
  schema: {
    type: typeof zodLiteral.value,
    enum: [zodLiteral._def.value]
  }
});

// src/create/schema/parsers/manual.ts
var createManualTypeSchema = (zodSchema, state) => {
  if (!zodSchema._def.openapi?.type) {
    const schemaName = zodSchema.constructor.name;
    throw new Error(
      `Unknown schema ${schemaName} at ${state.path.join(
        " > "
      )}. Please assign it a manual 'type'.`
    );
  }
  return {
    type: "schema",
    schema: {
      type: zodSchema._def.openapi.type
    }
  };
};

// src/openapi.ts
var openApiVersions = [
  "3.0.0",
  "3.0.1",
  "3.0.2",
  "3.0.3",
  "3.1.0"
];
var satisfiesVersion = (test, against) => openApiVersions.indexOf(test) >= openApiVersions.indexOf(against);

// src/create/schema/parsers/nativeEnum.ts
var createNativeEnumSchema = (zodEnum, state) => {
  const enumValues = getValidEnumValues(zodEnum._def.values);
  const { numbers, strings } = sortStringsAndNumbers(enumValues);
  if (strings.length && numbers.length) {
    if (satisfiesVersion(state.components.openapi, "3.1.0"))
      return {
        type: "schema",
        schema: {
          type: ["string", "number"],
          enum: [...strings, ...numbers]
        }
      };
    return {
      type: "schema",
      schema: {
        oneOf: [
          { type: "string", enum: strings },
          { type: "number", enum: numbers }
        ]
      }
    };
  }
  if (strings.length) {
    return {
      type: "schema",
      schema: {
        type: "string",
        enum: strings
      }
    };
  }
  return {
    type: "schema",
    schema: {
      type: "number",
      enum: numbers
    }
  };
};
var getValidEnumValues = (enumValues) => {
  const keys = Object.keys(enumValues).filter(
    (key) => typeof enumValues[enumValues[key]] !== "number"
  );
  return keys.map((key) => enumValues[key]);
};
var sortStringsAndNumbers = (values) => ({
  strings: values.filter((value) => typeof value === "string"),
  numbers: values.filter((value) => typeof value === "number")
});

// src/create/schema/parsers/null.ts
var createNullSchema = (_zodNull) => ({
  type: "schema",
  schema: {
    type: "null"
  }
});

// src/create/schema/parsers/nullable.ts
var createNullableSchema = (zodNullable, state) => {
  const schemaObject = createSchemaObject(zodNullable.unwrap(), state, [
    "nullable"
  ]);
  if (satisfiesVersion(state.components.openapi, "3.1.0")) {
    if (schemaObject.type === "ref" || schemaObject.schema.allOf) {
      return {
        type: "schema",
        schema: {
          oneOf: mapNullOf([schemaObject.schema], state.components.openapi)
        },
        effects: schemaObject.effects
      };
    }
    if (schemaObject.schema.oneOf) {
      const { oneOf, ...schema3 } = schemaObject.schema;
      return {
        type: "schema",
        schema: {
          oneOf: mapNullOf(oneOf, state.components.openapi),
          ...schema3
        },
        effects: schemaObject.effects
      };
    }
    if (schemaObject.schema.anyOf) {
      const { anyOf, ...schema3 } = schemaObject.schema;
      return {
        type: "schema",
        schema: {
          anyOf: mapNullOf(anyOf, state.components.openapi),
          ...schema3
        },
        effects: schemaObject.effects
      };
    }
    const { type: type2, ...schema2 } = schemaObject.schema;
    return {
      type: "schema",
      schema: {
        type: mapNullType(type2),
        ...schema2
      },
      effects: schemaObject.effects
    };
  }
  if (schemaObject.type === "ref") {
    return {
      type: "schema",
      schema: {
        allOf: [schemaObject.schema],
        nullable: true
      },
      effects: schemaObject.effects
    };
  }
  const { type, ...schema } = schemaObject.schema;
  return {
    type: "schema",
    schema: {
      ...type && { type },
      nullable: true,
      ...schema,
      // https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2019-10-31-Clarify-Nullable.md#if-a-schema-specifies-nullable-true-and-enum-1-2-3-does-that-schema-allow-null-values-see-1900
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...schema.enum && { enum: [...schema.enum, null] }
    },
    effects: schemaObject.effects
  };
};
var mapNullType = (type) => {
  if (!type) {
    return "null";
  }
  if (Array.isArray(type)) {
    return [...type, "null"];
  }
  return [type, "null"];
};
var mapNullOf = (ofSchema, openapi) => {
  if (satisfiesVersion(openapi, "3.1.0")) {
    return [...ofSchema, { type: "null" }];
  }
  return [...ofSchema, { nullable: true }];
};

// src/create/schema/parsers/number.ts
var createNumberSchema = (zodNumber, state) => {
  const zodNumberChecks = getZodNumberChecks(zodNumber);
  const minimum = mapMinimum(zodNumberChecks, state.components.openapi);
  const maximum = mapMaximum(zodNumberChecks, state.components.openapi);
  return {
    type: "schema",
    schema: {
      type: mapNumberType(zodNumberChecks),
      ...minimum && minimum,
      // Union types are not easy to tame
      ...maximum && maximum
    }
  };
};
var mapMaximum = (zodNumberCheck, openapi) => {
  if (!zodNumberCheck.max) {
    return void 0;
  }
  const maximum = zodNumberCheck.max.value;
  if (zodNumberCheck.max.inclusive) {
    return { ...maximum !== void 0 && { maximum } };
  }
  if (satisfiesVersion(openapi, "3.1.0")) {
    return { exclusiveMaximum: maximum };
  }
  return { maximum, exclusiveMaximum: true };
};
var mapMinimum = (zodNumberCheck, openapi) => {
  if (!zodNumberCheck.min) {
    return void 0;
  }
  const minimum = zodNumberCheck.min.value;
  if (zodNumberCheck.min.inclusive) {
    return { ...minimum !== void 0 && { minimum } };
  }
  if (satisfiesVersion(openapi, "3.1.0")) {
    return { exclusiveMinimum: minimum };
  }
  return { minimum, exclusiveMinimum: true };
};
var getZodNumberChecks = (zodNumber) => zodNumber._def.checks.reduce((acc, check) => {
  acc[check.kind] = check;
  return acc;
}, {});
var mapNumberType = (zodNumberChecks) => zodNumberChecks.int ? "integer" : "number";

// src/create/schema/parsers/optional.ts
var createOptionalSchema = (zodOptional, state) => createSchemaObject(zodOptional.unwrap(), state, ["optional"]);
var isOptionalSchema = (zodSchema, state) => {
  if (isZodType(zodSchema, "ZodOptional") || isZodType(zodSchema, "ZodNever") || isZodType(zodSchema, "ZodUndefined")) {
    return { optional: true };
  }
  if (isZodType(zodSchema, "ZodDefault")) {
    if (zodSchema._def.openapi?.effectType === "input") {
      return { optional: true };
    }
    if (zodSchema._def.openapi?.effectType === "output") {
      return { optional: false };
    }
    return {
      optional: state.type === "input",
      effects: [
        {
          type: "schema",
          creationType: state.type,
          zodType: zodSchema,
          path: [...state.path]
        }
      ]
    };
  }
  if (isZodType(zodSchema, "ZodNullable") || isZodType(zodSchema, "ZodCatch")) {
    return isOptionalSchema(zodSchema._def.innerType, state);
  }
  if (isZodType(zodSchema, "ZodEffects")) {
    return isOptionalSchema(zodSchema._def.schema, state);
  }
  if (isZodType(zodSchema, "ZodUnion") || isZodType(zodSchema, "ZodDiscriminatedUnion")) {
    const results = zodSchema._def.options.map(
      (schema) => isOptionalSchema(schema, state)
    );
    return results.reduce(
      (acc, result) => ({
        optional: acc.optional || result.optional,
        effects: flattenEffects([acc.effects, result.effects])
      }),
      { optional: false }
    );
  }
  if (isZodType(zodSchema, "ZodIntersection")) {
    const results = [zodSchema._def.left, zodSchema._def.right].map(
      (schema) => isOptionalSchema(schema, state)
    );
    return results.reduce(
      (acc, result) => ({
        optional: acc.optional || result.optional,
        effects: flattenEffects([acc.effects, result.effects])
      }),
      { optional: false }
    );
  }
  if (isZodType(zodSchema, "ZodPipeline")) {
    const type = zodSchema._def.openapi?.effectType ?? state.type;
    if (type === "input") {
      return isOptionalSchema(zodSchema._def.in, state);
    }
    if (type === "output") {
      return isOptionalSchema(zodSchema._def.out, state);
    }
  }
  if (isZodType(zodSchema, "ZodLazy")) {
    return isOptionalSchema(zodSchema._def.getter(), state);
  }
  return { optional: zodSchema.isOptional() };
};

// src/create/schema/parsers/object.ts
var createObjectSchema = (zodObject, state) => {
  const extendedSchema = createExtendedSchema(
    zodObject,
    zodObject._def.extendMetadata?.extends,
    state
  );
  if (extendedSchema) {
    return extendedSchema;
  }
  return createObjectSchemaFromShape(
    zodObject.shape,
    {
      unknownKeys: zodObject._def.unknownKeys,
      catchAll: zodObject._def.catchall
    },
    state
  );
};
var createExtendedSchema = (zodObject, baseZodObject, state) => {
  if (!baseZodObject) {
    return void 0;
  }
  const component = state.components.schemas.get(baseZodObject);
  if (component ?? baseZodObject._def.openapi?.ref) {
    createSchemaObject(baseZodObject, state, ["extended schema"]);
  }
  const completeComponent = state.components.schemas.get(baseZodObject);
  if (!completeComponent) {
    return void 0;
  }
  const diffOpts = createDiffOpts(
    {
      unknownKeys: baseZodObject._def.unknownKeys,
      catchAll: baseZodObject._def.catchall
    },
    {
      unknownKeys: zodObject._def.unknownKeys,
      catchAll: zodObject._def.catchall
    }
  );
  if (!diffOpts) {
    return void 0;
  }
  const diffShape = createShapeDiff(
    baseZodObject._def.shape(),
    zodObject._def.shape()
  );
  if (!diffShape) {
    return void 0;
  }
  const extendedSchema = createObjectSchemaFromShape(
    diffShape,
    diffOpts,
    state
  );
  return {
    type: "schema",
    schema: {
      allOf: [{ $ref: createComponentSchemaRef(completeComponent.ref) }],
      ...extendedSchema.schema
    },
    effects: flattenEffects([
      completeComponent.type === "complete" ? completeComponent.effects : [],
      completeComponent.type === "in-progress" ? [
        {
          type: "component",
          zodType: zodObject,
          path: [...state.path]
        }
      ] : [],
      extendedSchema.effects
    ])
  };
};
var createDiffOpts = (baseOpts, extendedOpts) => {
  if (baseOpts.unknownKeys === "strict" || !isZodType(baseOpts.catchAll, "ZodNever")) {
    return void 0;
  }
  return {
    catchAll: extendedOpts.catchAll,
    unknownKeys: extendedOpts.unknownKeys
  };
};
var createShapeDiff = (baseObj, extendedObj) => {
  const acc = {};
  for (const [key, val] of Object.entries(extendedObj)) {
    const baseValue = baseObj[key];
    if (val === baseValue) {
      continue;
    }
    if (baseValue === void 0) {
      acc[key] = extendedObj[key];
      continue;
    }
    return null;
  }
  return acc;
};
var createObjectSchemaFromShape = (shape, { unknownKeys, catchAll }, state) => {
  const properties = mapProperties(shape, state);
  const required = mapRequired(shape, state);
  const additionalProperties = !isZodType(catchAll, "ZodNever") ? createSchemaObject(catchAll, state, ["additional properties"]) : void 0;
  return {
    type: "schema",
    schema: {
      type: "object",
      ...properties && { properties: properties.properties },
      ...required?.required.length && { required: required.required },
      ...unknownKeys === "strict" && { additionalProperties: false },
      ...additionalProperties && {
        additionalProperties: additionalProperties.schema
      }
    },
    effects: flattenEffects([
      ...properties?.effects ?? [],
      additionalProperties?.effects,
      required?.effects
    ])
  };
};
var mapRequired = (shape, state) => {
  const { required, effects: allEffects } = Object.entries(shape).reduce(
    (acc, [key, zodSchema]) => {
      state.path.push(`property: ${key}`);
      const { optional, effects } = isOptionalSchema(zodSchema, state);
      state.path.pop();
      if (!optional) {
        acc.required.push(key);
      }
      if (effects) {
        acc.effects.push(effects);
      }
      return acc;
    },
    {
      required: [],
      effects: []
    }
  );
  return { required, effects: flattenEffects(allEffects) };
};
var mapProperties = (shape, state) => {
  const shapeEntries = Object.entries(shape);
  if (!shapeEntries.length) {
    return void 0;
  }
  return shapeEntries.reduce(
    (acc, [key, zodSchema]) => {
      if (isZodType(zodSchema, "ZodNever") || isZodType(zodSchema, "ZodUndefined")) {
        return acc;
      }
      const property = createSchemaObject(zodSchema, state, [
        `property: ${key}`
      ]);
      acc.properties[key] = property.schema;
      acc.effects.push(property.effects);
      return acc;
    },
    {
      properties: {},
      effects: []
    }
  );
};

// src/create/schema/parsers/pipeline.ts
var createPipelineSchema = (zodPipeline, state) => {
  if (zodPipeline._def.openapi?.effectType === "input" || zodPipeline._def.openapi?.effectType === "same") {
    return createSchemaObject(zodPipeline._def.in, state, ["pipeline input"]);
  }
  if (zodPipeline._def.openapi?.effectType === "output") {
    return createSchemaObject(zodPipeline._def.out, state, ["pipeline output"]);
  }
  if (state.type === "input") {
    const schema2 = createSchemaObject(zodPipeline._def.in, state, [
      "pipeline input"
    ]);
    return {
      ...schema2,
      effects: flattenEffects([
        [
          {
            type: "schema",
            creationType: "input",
            path: [...state.path],
            zodType: zodPipeline
          }
        ],
        schema2.effects
      ])
    };
  }
  const schema = createSchemaObject(zodPipeline._def.out, state, [
    "pipeline output"
  ]);
  return {
    ...schema,
    effects: flattenEffects([
      [
        {
          type: "schema",
          creationType: "output",
          path: [...state.path],
          zodType: zodPipeline
        }
      ],
      schema.effects
    ])
  };
};

// src/create/schema/parsers/preprocess.ts
var createPreprocessSchema = (zodPreprocess, state) => createSchemaObject(zodPreprocess._def.schema, state, ["preprocess schema"]);

// src/create/schema/parsers/readonly.ts
var createReadonlySchema = (zodReadonly, state) => (
  // Readonly doesn't change OpenAPI schema
  createSchemaObject(zodReadonly._def.innerType, state, ["readonly"])
);

// src/create/schema/parsers/record.ts
var createRecordSchema = (zodRecord, state) => {
  const additionalProperties = createSchemaObject(
    zodRecord.valueSchema,
    state,
    ["record value"]
  );
  const keySchema = createSchemaObject(zodRecord.keySchema, state, [
    "record key"
  ]);
  const maybeComponent = state.components.schemas.get(zodRecord.keySchema);
  const isComplete = maybeComponent && maybeComponent.type === "complete";
  const maybeSchema = isComplete && maybeComponent.schemaObject;
  const maybeEffects = isComplete && maybeComponent.effects || void 0;
  const renderedKeySchema = maybeSchema || keySchema.schema;
  if ("enum" in renderedKeySchema && renderedKeySchema.enum) {
    return {
      type: "schema",
      schema: {
        type: "object",
        properties: renderedKeySchema.enum.reduce((acc, key) => {
          acc[key] = additionalProperties.schema;
          return acc;
        }, {}),
        additionalProperties: false
      },
      effects: flattenEffects([
        keySchema.effects,
        additionalProperties.effects,
        maybeEffects
      ])
    };
  }
  if (satisfiesVersion(state.components.openapi, "3.1.0") && "type" in renderedKeySchema && renderedKeySchema.type === "string" && Object.keys(renderedKeySchema).length > 1) {
    return {
      type: "schema",
      schema: {
        type: "object",
        propertyNames: keySchema.schema,
        additionalProperties: additionalProperties.schema
      },
      effects: flattenEffects([
        keySchema.effects,
        additionalProperties.effects
      ])
    };
  }
  return {
    type: "schema",
    schema: {
      type: "object",
      additionalProperties: additionalProperties.schema
    },
    effects: additionalProperties.effects
  };
};

// src/create/schema/parsers/refine.ts
var createRefineSchema = (zodRefine, state) => createSchemaObject(zodRefine._def.schema, state, ["refine schema"]);

// src/create/schema/parsers/set.ts
var createSetSchema = (zodSet, state) => {
  const schema = zodSet._def.valueType;
  const minItems = zodSet._def.minSize?.value;
  const maxItems = zodSet._def.maxSize?.value;
  const itemSchema = createSchemaObject(schema, state, ["set items"]);
  return {
    type: "schema",
    schema: {
      type: "array",
      items: itemSchema.schema,
      uniqueItems: true,
      ...minItems !== void 0 && { minItems },
      ...maxItems !== void 0 && { maxItems }
    },
    effects: itemSchema.effects
  };
};

// src/create/schema/parsers/string.ts
var createStringSchema = (zodString) => {
  const zodStringChecks = getZodStringChecks(zodString);
  const format = mapStringFormat(zodStringChecks);
  const patterns = mapPatterns(zodStringChecks);
  const minLength = zodStringChecks.length?.[0]?.value ?? zodStringChecks.min?.[0]?.value;
  const maxLength = zodStringChecks.length?.[0]?.value ?? zodStringChecks.max?.[0]?.value;
  if (patterns.length <= 1) {
    return {
      type: "schema",
      schema: {
        type: "string",
        ...format && { format },
        ...patterns[0] && { pattern: patterns[0] },
        ...minLength !== void 0 && { minLength },
        ...maxLength !== void 0 && { maxLength }
      }
    };
  }
  return {
    type: "schema",
    schema: {
      allOf: [
        {
          type: "string",
          ...format && { format },
          ...patterns[0] && { pattern: patterns[0] },
          ...minLength !== void 0 && { minLength },
          ...maxLength !== void 0 && { maxLength }
        },
        ...patterns.slice(1).map(
          (pattern) => ({
            type: "string",
            pattern
          })
        )
      ]
    }
  };
};
var getZodStringChecks = (zodString) => zodString._def.checks.reduce(
  (acc, check) => {
    const mapping = acc[check.kind];
    if (mapping) {
      mapping.push(check);
      return acc;
    }
    acc[check.kind] = [check];
    return acc;
  },
  {}
);
var mapPatterns = (zodStringChecks) => {
  const startsWith = mapStartsWith(zodStringChecks);
  const endsWith = mapEndsWith(zodStringChecks);
  const regex = mapRegex(zodStringChecks);
  const includes = mapIncludes(zodStringChecks);
  const patterns = [
    ...regex ?? [],
    ...startsWith ? [startsWith] : [],
    ...endsWith ? [endsWith] : [],
    ...includes ?? []
  ];
  return patterns;
};
var mapStartsWith = (zodStringChecks) => {
  if (zodStringChecks.startsWith?.[0]?.value) {
    return `^${zodStringChecks.startsWith[0].value}`;
  }
  return void 0;
};
var mapEndsWith = (zodStringChecks) => {
  if (zodStringChecks.endsWith?.[0]?.value) {
    return `${zodStringChecks.endsWith[0].value}$`;
  }
  return void 0;
};
var mapRegex = (zodStringChecks) => zodStringChecks.regex?.map((regexCheck) => regexCheck.regex.source);
var mapIncludes = (zodStringChecks) => zodStringChecks.includes?.map((includeCheck) => {
  if (includeCheck.position === 0) {
    return `^${includeCheck.value}`;
  }
  if (includeCheck.position) {
    return `^.{${includeCheck.position}}${includeCheck.value}`;
  }
  return includeCheck.value;
});
var mapStringFormat = (zodStringChecks) => {
  if (zodStringChecks.uuid) {
    return "uuid";
  }
  if (zodStringChecks.datetime) {
    return "date-time";
  }
  if (zodStringChecks.email) {
    return "email";
  }
  if (zodStringChecks.url) {
    return "uri";
  }
  return void 0;
};

// src/create/schema/parsers/tuple.ts
var createTupleSchema = (zodTuple, state) => {
  const items = zodTuple.items;
  const rest = zodTuple._def.rest;
  const prefixItems = mapPrefixItems(items, state);
  if (satisfiesVersion(state.components.openapi, "3.1.0")) {
    if (!rest) {
      return {
        type: "schema",
        schema: {
          type: "array",
          maxItems: items.length,
          minItems: items.length,
          ...prefixItems && {
            prefixItems: prefixItems.schemas.map((item) => item.schema)
          }
        },
        effects: prefixItems?.effects
      };
    }
    const itemSchema = createSchemaObject(rest, state, ["tuple items"]);
    return {
      type: "schema",
      schema: {
        type: "array",
        items: itemSchema.schema,
        ...prefixItems && {
          prefixItems: prefixItems.schemas.map((item) => item.schema)
        }
      },
      effects: flattenEffects([prefixItems?.effects, itemSchema.effects])
    };
  }
  if (!rest) {
    return {
      type: "schema",
      schema: {
        type: "array",
        maxItems: items.length,
        minItems: items.length,
        ...prefixItems && {
          items: { oneOf: prefixItems.schemas.map((item) => item.schema) }
        }
      },
      effects: prefixItems?.effects
    };
  }
  if (prefixItems) {
    const restSchema = createSchemaObject(rest, state, ["tuple items"]);
    return {
      type: "schema",
      schema: {
        type: "array",
        items: {
          oneOf: [
            ...prefixItems.schemas.map((item) => item.schema),
            restSchema.schema
          ]
        }
      },
      effects: flattenEffects([restSchema.effects, prefixItems.effects])
    };
  }
  return {
    type: "schema",
    schema: {
      type: "array"
    }
  };
};
var mapPrefixItems = (items, state) => {
  if (items.length) {
    const schemas = items.map(
      (item, index) => createSchemaObject(item, state, [`tuple item ${index}`])
    );
    return {
      effects: flattenEffects(schemas.map((s) => s.effects)),
      schemas
    };
  }
  return void 0;
};

// src/create/schema/parsers/union.ts
var createUnionSchema = (zodUnion, state) => {
  const schemas = zodUnion.options.map(
    (option, index) => createSchemaObject(option, state, [`union option ${index}`])
  );
  if (zodUnion._def.openapi?.unionOneOf) {
    return {
      type: "schema",
      schema: {
        oneOf: schemas.map((s) => s.schema)
      },
      effects: flattenEffects(schemas.map((s) => s.effects))
    };
  }
  return {
    type: "schema",
    schema: {
      anyOf: schemas.map((s) => s.schema)
    },
    effects: flattenEffects(schemas.map((s) => s.effects))
  };
};

// src/create/schema/parsers/unknown.ts
var createUnknownSchema = (_zodUnknown) => ({
  type: "schema",
  schema: {}
});

// src/create/schema/parsers/index.ts
var createSchemaSwitch = (zodSchema, state) => {
  if (zodSchema._def.openapi?.type) {
    return createManualTypeSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodString")) {
    return createStringSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodNumber")) {
    return createNumberSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodBoolean")) {
    return createBooleanSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodEnum")) {
    return createEnumSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodLiteral")) {
    return createLiteralSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodNativeEnum")) {
    return createNativeEnumSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodArray")) {
    return createArraySchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodObject")) {
    return createObjectSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodUnion")) {
    return createUnionSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodDiscriminatedUnion")) {
    return createDiscriminatedUnionSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodNull")) {
    return createNullSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodNullable")) {
    return createNullableSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodOptional")) {
    return createOptionalSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodReadonly")) {
    return createReadonlySchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodDefault")) {
    return createDefaultSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodRecord")) {
    return createRecordSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodTuple")) {
    return createTupleSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodDate")) {
    return createDateSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodPipeline")) {
    return createPipelineSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodEffects") && zodSchema._def.effect.type === "transform") {
    return createTransformSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodEffects") && zodSchema._def.effect.type === "preprocess") {
    return createPreprocessSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodEffects") && zodSchema._def.effect.type === "refinement") {
    return createRefineSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodNativeEnum")) {
    return createNativeEnumSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodIntersection")) {
    return createIntersectionSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodCatch")) {
    return createCatchSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodUnknown") || isZodType(zodSchema, "ZodAny")) {
    return createUnknownSchema(zodSchema);
  }
  if (isZodType(zodSchema, "ZodLazy")) {
    return createLazySchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodBranded")) {
    return createBrandedSchema(zodSchema, state);
  }
  if (isZodType(zodSchema, "ZodSet")) {
    return createSetSchema(zodSchema, state);
  }
  return createManualTypeSchema(zodSchema, state);
};

// src/create/schema/index.ts
var isDescriptionEqual = (schema, zodSchema) => schema.type === "ref" && zodSchema.description === schema.zodType.description;
var createNewSchema = (zodSchema, state) => {
  if (state.visited.has(zodSchema)) {
    throw new Error(
      `The schema at ${state.path.join(
        " > "
      )} needs to be registered because it's circularly referenced`
    );
  }
  state.visited.add(zodSchema);
  const {
    effectType,
    param,
    header,
    ref,
    refType,
    unionOneOf,
    ...additionalMetadata
  } = zodSchema._def.openapi ?? {};
  const schema = createSchemaSwitch(zodSchema, state);
  const description = zodSchema.description && !isDescriptionEqual(schema, zodSchema) ? zodSchema.description : void 0;
  const schemaWithMetadata = enhanceWithMetadata(schema, {
    ...description && { description },
    ...additionalMetadata
  });
  state.visited.delete(zodSchema);
  return schemaWithMetadata;
};
var createNewRef = (ref, zodSchema, state) => {
  state.components.schemas.set(zodSchema, {
    type: "in-progress",
    ref
  });
  const newSchema = createNewSchema(zodSchema, {
    ...state,
    visited: /* @__PURE__ */ new Set()
  });
  state.components.schemas.set(zodSchema, {
    type: "complete",
    ref,
    schemaObject: newSchema.schema,
    effects: newSchema.effects
  });
  return {
    type: "ref",
    schema: { $ref: createComponentSchemaRef(ref) },
    effects: newSchema.effects ? [
      {
        type: "component",
        zodType: zodSchema,
        path: [...state.path]
      }
    ] : void 0,
    zodType: zodSchema
  };
};
var createExistingRef = (zodSchema, component, state) => {
  if (component && component.type === "complete") {
    return {
      type: "ref",
      schema: { $ref: createComponentSchemaRef(component.ref) },
      effects: component.effects ? [
        {
          type: "component",
          zodType: zodSchema,
          path: [...state.path]
        }
      ] : void 0,
      zodType: zodSchema
    };
  }
  if (component && component.type === "in-progress") {
    return {
      type: "ref",
      schema: { $ref: createComponentSchemaRef(component.ref) },
      effects: [
        {
          type: "component",
          zodType: zodSchema,
          path: [...state.path]
        }
      ],
      zodType: zodSchema
    };
  }
  return;
};
var createSchemaOrRef = (zodSchema, state) => {
  const component = state.components.schemas.get(zodSchema);
  const existingRef = createExistingRef(zodSchema, component, state);
  if (existingRef) {
    return existingRef;
  }
  const ref = zodSchema._def.openapi?.ref ?? component?.ref;
  if (ref) {
    return createNewRef(ref, zodSchema, state);
  }
  return createNewSchema(zodSchema, state);
};
var createSchemaObject = (zodSchema, state, subpath) => {
  state.path.push(...subpath);
  const schema = createSchemaOrRef(zodSchema, state);
  state.path.pop();
  return schema;
};
var createSchema = (zodSchema, state, subpath) => {
  const schema = createSchemaObject(zodSchema, state, subpath);
  if (schema.effects) {
    verifyEffects(schema.effects, state);
  }
  return schema.schema;
};

// src/create/parameters.ts
var createComponentParamRef = (ref) => `#/components/parameters/${ref}`;
var createBaseParameter = (schema, components, subpath) => {
  const { ref, ...rest } = schema._def.openapi?.param ?? {};
  const state = {
    components,
    type: "input",
    path: [],
    visited: /* @__PURE__ */ new Set()
  };
  const schemaObject = createSchema(schema, state, [...subpath, "schema"]);
  const required = !isOptionalSchema(schema, state)?.optional;
  const description = schema._def.openapi?.description ?? schema._def.description;
  return {
    ...description && { description },
    ...rest,
    ...schema && { schema: schemaObject },
    ...required && { required }
  };
};
var createParamOrRef = (zodSchema, components, subpath, type, name) => {
  const component = components.parameters.get(zodSchema);
  const paramType = zodSchema._def?.openapi?.param?.in ?? component?.in ?? type;
  const paramName = zodSchema._def?.openapi?.param?.name ?? component?.name ?? name;
  if (!paramType) {
    throw new Error("Parameter type missing");
  }
  if (!paramName) {
    throw new Error("Parameter name missing");
  }
  if (component && component.type === "complete") {
    if (!("$ref" in component.paramObject) && (component.in !== paramType || component.name !== paramName)) {
      throw new Error(`parameterRef "${component.ref}" is already registered`);
    }
    return {
      $ref: createComponentParamRef(component.ref)
    };
  }
  const baseParamOrRef = createBaseParameter(zodSchema, components, subpath);
  if ("$ref" in baseParamOrRef) {
    throw new Error("Unexpected Error: received a reference object");
  }
  const ref = zodSchema?._def?.openapi?.param?.ref ?? component?.ref;
  const paramObject = {
    in: paramType,
    name: paramName,
    ...baseParamOrRef
  };
  if (ref) {
    components.parameters.set(zodSchema, {
      type: "complete",
      paramObject,
      ref,
      in: paramType,
      name: paramName
    });
    return {
      $ref: createComponentParamRef(ref)
    };
  }
  return paramObject;
};
var createParameters = (type, zodObjectType, components, subpath) => {
  if (!zodObjectType) {
    return [];
  }
  const zodObject = getZodObject(zodObjectType, "input").shape;
  return Object.entries(zodObject).map(
    ([key, zodSchema]) => createParamOrRef(zodSchema, components, [...subpath, key], type, key)
  );
};
var createRequestParams = (requestParams, components, subpath) => {
  if (!requestParams) {
    return [];
  }
  const pathParams = createParameters("path", requestParams.path, components, [
    ...subpath,
    "path"
  ]);
  const queryParams = createParameters(
    "query",
    requestParams.query,
    components,
    [...subpath, "query"]
  );
  const cookieParams = createParameters(
    "cookie",
    requestParams.cookie,
    components,
    [...subpath, "cookie"]
  );
  const headerParams = createParameters(
    "header",
    requestParams.header,
    components,
    [...subpath, "header"]
  );
  return [...pathParams, ...queryParams, ...cookieParams, ...headerParams];
};
var createManualParameters = (parameters, components, subpath) => parameters?.map((param, index) => {
  if (isAnyZodType(param)) {
    return createParamOrRef(param, components, [
      ...subpath,
      `param index ${index}`
    ]);
  }
  return param;
}) ?? [];
var createParametersObject = (parameters, requestParams, components, subpath) => {
  const manualParameters = createManualParameters(
    parameters,
    components,
    subpath
  );
  const createdParams = createRequestParams(requestParams, components, subpath);
  const combinedParameters = [
    ...manualParameters,
    ...createdParams
  ];
  return combinedParameters.length ? combinedParameters : void 0;
};
var getZodObject = (schema, type) => {
  if (isZodType(schema, "ZodObject")) {
    return schema;
  }
  if (isZodType(schema, "ZodLazy")) {
    return getZodObject(schema.schema, type);
  }
  if (isZodType(schema, "ZodEffects")) {
    return getZodObject(schema.innerType(), type);
  }
  if (isZodType(schema, "ZodBranded")) {
    return getZodObject(schema.unwrap(), type);
  }
  if (isZodType(schema, "ZodPipeline")) {
    if (type === "input") {
      return getZodObject(schema._def.in, type);
    }
    return getZodObject(schema._def.out, type);
  }
  throw new Error("failed to find ZodObject in schema");
};

// src/create/content.ts
var createMediaTypeSchema = (schemaObject, components, type, subpath) => {
  if (!schemaObject) {
    return void 0;
  }
  if (!isAnyZodType(schemaObject)) {
    return schemaObject;
  }
  return createSchema(
    schemaObject,
    {
      components,
      type,
      path: [],
      visited: /* @__PURE__ */ new Set()
    },
    subpath
  );
};
var createMediaTypeObject = (mediaTypeObject, components, type, subpath) => {
  if (!mediaTypeObject) {
    return void 0;
  }
  return {
    ...mediaTypeObject,
    schema: createMediaTypeSchema(mediaTypeObject.schema, components, type, [
      ...subpath,
      "schema"
    ])
  };
};
var createContent = (contentObject, components, type, subpath) => Object.entries(contentObject).reduce(
  (acc, [mediaType, zodOpenApiMediaTypeObject]) => {
    const mediaTypeObject = createMediaTypeObject(
      zodOpenApiMediaTypeObject,
      components,
      type,
      [...subpath, mediaType]
    );
    if (mediaTypeObject) {
      acc[mediaType] = mediaTypeObject;
    }
    return acc;
  },
  {}
);

// src/create/specificationExtension.ts
var isISpecificationExtension = (key) => key.startsWith("x-");

// src/create/responses.ts
var createResponseHeaders = (responseHeaders, components) => {
  if (!responseHeaders) {
    return void 0;
  }
  if (isAnyZodType(responseHeaders)) {
    return Object.entries(responseHeaders.shape).reduce((acc, [key, zodSchema]) => {
      acc[key] = createHeaderOrRef(zodSchema, components);
      return acc;
    }, {});
  }
  return responseHeaders;
};
var createHeaderOrRef = (schema, components) => {
  const component = components.headers.get(schema);
  if (component && component.type === "complete") {
    return {
      $ref: createComponentHeaderRef(component.ref)
    };
  }
  const baseHeader = createBaseHeader(schema, components);
  if ("$ref" in baseHeader) {
    throw new Error("Unexpected Error: received a reference object");
  }
  const ref = schema._def?.openapi?.header?.ref ?? component?.ref;
  if (ref) {
    components.headers.set(schema, {
      type: "complete",
      headerObject: baseHeader,
      ref
    });
    return {
      $ref: createComponentHeaderRef(ref)
    };
  }
  return baseHeader;
};
var createBaseHeader = (schema, components) => {
  const { ref, ...rest } = schema._def.openapi?.header ?? {};
  const state = {
    components,
    type: "output",
    path: [],
    visited: /* @__PURE__ */ new Set()
  };
  const schemaObject = createSchema(schema, state, ["header"]);
  const required = !isOptionalSchema(schema, state)?.optional;
  return {
    ...rest,
    ...schema && { schema: schemaObject },
    ...required && { required }
  };
};
var createComponentHeaderRef = (ref) => `#/components/headers/${ref}`;
var createResponse = (responseObject, components, subpath) => {
  if ("$ref" in responseObject) {
    return responseObject;
  }
  const component = components.responses.get(responseObject);
  if (component && component.type === "complete") {
    return { $ref: createComponentResponseRef(component.ref) };
  }
  const { content, headers, ref, ...rest } = responseObject;
  const maybeHeaders = createResponseHeaders(headers, components);
  const response = {
    ...rest,
    ...maybeHeaders && { headers: maybeHeaders },
    ...content && {
      content: createContent(content, components, "output", [
        ...subpath,
        "content"
      ])
    }
  };
  const responseRef = ref ?? component?.ref;
  if (responseRef) {
    components.responses.set(responseObject, {
      responseObject: response,
      ref: responseRef,
      type: "complete"
    });
    return {
      $ref: createComponentResponseRef(responseRef)
    };
  }
  return response;
};
var createResponses = (responsesObject, components, subpath) => Object.entries(responsesObject).reduce(
  (acc, [statusCode, responseObject]) => {
    if (isISpecificationExtension(statusCode)) {
      acc[statusCode] = responseObject;
      return acc;
    }
    acc[statusCode] = createResponse(responseObject, components, [
      ...subpath,
      statusCode
    ]);
    return acc;
  },
  {}
);

// src/create/paths.ts
var createRequestBody = (requestBodyObject, components, subpath) => {
  if (!requestBodyObject) {
    return void 0;
  }
  const component = components.requestBodies.get(requestBodyObject);
  if (component && component.type === "complete") {
    return {
      $ref: createComponentRequestBodyRef(component.ref)
    };
  }
  const ref = requestBodyObject.ref ?? component?.ref;
  const requestBody = {
    ...requestBodyObject,
    content: createContent(requestBodyObject.content, components, "input", [
      ...subpath,
      "content"
    ])
  };
  if (ref) {
    components.requestBodies.set(requestBodyObject, {
      type: "complete",
      ref,
      requestBodyObject: requestBody
    });
    return {
      $ref: createComponentRequestBodyRef(ref)
    };
  }
  return requestBody;
};
var createOperation = (operationObject, components, subpath) => {
  const { parameters, requestParams, requestBody, responses, ...rest } = operationObject;
  const maybeParameters = createParametersObject(
    parameters,
    requestParams,
    components,
    [...subpath, "parameters"]
  );
  const maybeRequestBody = createRequestBody(
    operationObject.requestBody,
    components,
    [...subpath, "request body"]
  );
  const maybeResponses = createResponses(
    operationObject.responses,
    components,
    [...subpath, "responses"]
  );
  return {
    ...rest,
    ...maybeParameters && { parameters: maybeParameters },
    ...maybeRequestBody && { requestBody: maybeRequestBody },
    ...maybeResponses && { responses: maybeResponses }
  };
};
var createPathItem = (pathObject, components, path) => Object.entries(pathObject).reduce(
  (acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    if (key === "get" || key === "put" || key === "post" || key === "delete" || key === "options" || key === "head" || key === "patch" || key === "trace") {
      acc[key] = createOperation(
        value,
        components,
        [path, key]
      );
      return acc;
    }
    acc[key] = value;
    return acc;
  },
  {}
);
var createPaths = (pathsObject, components) => {
  if (!pathsObject) {
    return void 0;
  }
  return Object.entries(pathsObject).reduce(
    (acc, [path, pathItemObject]) => {
      if (isISpecificationExtension(path)) {
        acc[path] = pathItemObject;
        return acc;
      }
      acc[path] = createPathItem(pathItemObject, components, path);
      return acc;
    },
    {}
  );
};

// src/create/components.ts
var getDefaultComponents = (componentsObject, openapi = "3.1.0") => {
  const defaultComponents = {
    schemas: /* @__PURE__ */ new Map(),
    parameters: /* @__PURE__ */ new Map(),
    headers: /* @__PURE__ */ new Map(),
    requestBodies: /* @__PURE__ */ new Map(),
    responses: /* @__PURE__ */ new Map(),
    openapi
  };
  if (!componentsObject) {
    return defaultComponents;
  }
  getSchemas(componentsObject.schemas, defaultComponents);
  getParameters(componentsObject.parameters, defaultComponents);
  getRequestBodies(componentsObject.requestBodies, defaultComponents);
  getHeaders(componentsObject.headers, defaultComponents);
  getResponses(componentsObject.responses, defaultComponents);
  return defaultComponents;
};
var getSchemas = (schemas, components) => {
  if (!schemas) {
    return;
  }
  Object.entries(schemas).forEach(([key, schema]) => {
    if (isAnyZodType(schema)) {
      if (components.schemas.has(schema)) {
        throw new Error(
          `Schema ${JSON.stringify(schema._def)} is already registered`
        );
      }
      const ref = schema._def.openapi?.ref ?? key;
      components.schemas.set(schema, {
        type: "manual",
        ref
      });
    }
  });
};
var getParameters = (parameters, components) => {
  if (!parameters) {
    return;
  }
  Object.entries(parameters).forEach(([key, schema]) => {
    if (isAnyZodType(schema)) {
      if (components.parameters.has(schema)) {
        throw new Error(
          `Parameter ${JSON.stringify(schema._def)} is already registered`
        );
      }
      const ref = schema._def.openapi?.param?.ref ?? key;
      const name = schema._def.openapi?.param?.name;
      const location = schema._def.openapi?.param?.in;
      if (!name || !location) {
        throw new Error("`name` or `in` missing in .openapi()");
      }
      components.parameters.set(schema, {
        type: "manual",
        ref,
        in: location,
        name
      });
    }
  });
};
var getHeaders = (responseHeaders, components) => {
  if (!responseHeaders) {
    return;
  }
  Object.entries(responseHeaders).forEach(([key, schema]) => {
    if (isAnyZodType(schema)) {
      if (components.parameters.has(schema)) {
        throw new Error(
          `Header ${JSON.stringify(schema._def)} is already registered`
        );
      }
      const ref = schema._def.openapi?.param?.ref ?? key;
      components.headers.set(schema, {
        type: "manual",
        ref
      });
    }
  });
};
var getResponses = (responses, components) => {
  if (!responses) {
    return;
  }
  Object.entries(responses).forEach(([key, responseObject]) => {
    if (components.responses.has(responseObject)) {
      throw new Error(
        `Header ${JSON.stringify(responseObject)} is already registered`
      );
    }
    const ref = responseObject?.ref ?? key;
    components.responses.set(responseObject, {
      type: "manual",
      ref
    });
  });
};
var getRequestBodies = (requestBodies, components) => {
  if (!requestBodies) {
    return;
  }
  Object.entries(requestBodies).forEach(([key, requestBody]) => {
    if (components.requestBodies.has(requestBody)) {
      throw new Error(
        `Header ${JSON.stringify(requestBody)} is already registered`
      );
    }
    const ref = requestBody?.ref ?? key;
    components.requestBodies.set(requestBody, {
      type: "manual",
      ref
    });
  });
};
var createComponentSchemaRef = (schemaRef) => `#/components/schemas/${schemaRef}`;
var createComponentResponseRef = (responseRef) => `#/components/responses/${responseRef}`;
var createComponentRequestBodyRef = (requestBodyRef) => `#/components/requestBodies/${requestBodyRef}`;
var createComponents = (componentsObject, components) => {
  const combinedSchemas = createSchemaComponents(componentsObject, components);
  const combinedParameters = createParamComponents(
    componentsObject,
    components
  );
  const combinedHeaders = createHeaderComponents(componentsObject, components);
  const combinedResponses = createResponseComponents(components);
  const combinedRequestBodies = createRequestBodiesComponents(components);
  const { schemas, parameters, headers, responses, requestBodies, ...rest } = componentsObject;
  const finalComponents = {
    ...rest,
    ...combinedSchemas && { schemas: combinedSchemas },
    ...combinedParameters && { parameters: combinedParameters },
    ...combinedRequestBodies && { requestBodies: combinedRequestBodies },
    ...combinedHeaders && { headers: combinedHeaders },
    ...combinedResponses && { responses: combinedResponses }
  };
  return Object.keys(finalComponents).length ? finalComponents : void 0;
};
var createSchemaComponents = (componentsObject, components) => {
  Array.from(components.schemas).forEach(([schema, { type }], index) => {
    if (type === "manual") {
      const state = {
        components,
        type: schema._def.openapi?.refType ?? "output",
        path: [],
        visited: /* @__PURE__ */ new Set()
      };
      createSchema(schema, state, [`component schema index ${index}`]);
    }
  });
  const customComponents = Object.entries(
    componentsObject.schemas ?? {}
  ).reduce(
    (acc, [key, value]) => {
      if (isAnyZodType(value)) {
        return acc;
      }
      if (acc[key]) {
        throw new Error(`Schema "${key}" is already registered`);
      }
      acc[key] = value;
      return acc;
    },
    {}
  );
  const finalComponents = Array.from(components.schemas).reduce((acc, [_zodType, component]) => {
    if (component.type === "complete") {
      if (acc[component.ref]) {
        throw new Error(`Schema "${component.ref}" is already registered`);
      }
      acc[component.ref] = component.schemaObject;
    }
    return acc;
  }, customComponents);
  return Object.keys(finalComponents).length ? finalComponents : void 0;
};
var createParamComponents = (componentsObject, components) => {
  Array.from(components.parameters).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createParamOrRef(
        schema,
        components,
        [`component parameter index ${index}`],
        component.in,
        component.ref
      );
    }
  });
  const customComponents = Object.entries(
    componentsObject.parameters ?? {}
  ).reduce(
    (acc, [key, value]) => {
      if (!isAnyZodType(value)) {
        if (acc[key]) {
          throw new Error(`Parameter "${key}" is already registered`);
        }
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
  const finalComponents = Array.from(components.parameters).reduce((acc, [_zodType, component]) => {
    if (component.type === "complete") {
      if (acc[component.ref]) {
        throw new Error(`Parameter "${component.ref}" is already registered`);
      }
      acc[component.ref] = component.paramObject;
    }
    return acc;
  }, customComponents);
  return Object.keys(finalComponents).length ? finalComponents : void 0;
};
var createHeaderComponents = (componentsObject, components) => {
  Array.from(components.headers).forEach(([schema, component]) => {
    if (component.type === "manual") {
      createHeaderOrRef(schema, components);
    }
  });
  const headers = componentsObject.headers ?? {};
  const customComponents = Object.entries(headers).reduce((acc, [key, value]) => {
    if (!isAnyZodType(value)) {
      if (acc[key]) {
        throw new Error(`Header Ref "${key}" is already registered`);
      }
      acc[key] = value;
    }
    return acc;
  }, {});
  const finalComponents = Array.from(components.headers).reduce((acc, [_zodType, component]) => {
    if (component.type === "complete") {
      if (acc[component.ref]) {
        throw new Error(`Header "${component.ref}" is already registered`);
      }
      acc[component.ref] = component.headerObject;
    }
    return acc;
  }, customComponents);
  return Object.keys(finalComponents).length ? finalComponents : void 0;
};
var createResponseComponents = (components) => {
  Array.from(components.responses).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createResponse(schema, components, [`component response index ${index}`]);
    }
  });
  const finalComponents = Array.from(components.responses).reduce((acc, [_zodType, component]) => {
    if (component.type === "complete") {
      if (acc[component.ref]) {
        throw new Error(`Response "${component.ref}" is already registered`);
      }
      acc[component.ref] = component.responseObject;
    }
    return acc;
  }, {});
  return Object.keys(finalComponents).length ? finalComponents : void 0;
};
var createRequestBodiesComponents = (components) => {
  Array.from(components.requestBodies).forEach(([schema, component], index) => {
    if (component.type === "manual") {
      createRequestBody(schema, components, [
        `component request body ${index}`
      ]);
    }
  });
  const finalComponents = Array.from(components.requestBodies).reduce((acc, [_zodType, component]) => {
    if (component.type === "complete") {
      if (acc[component.ref]) {
        throw new Error(`RequestBody "${component.ref}" is already registered`);
      }
      acc[component.ref] = component.requestBodyObject;
    }
    return acc;
  }, {});
  return Object.keys(finalComponents).length ? finalComponents : void 0;
};

// src/create/document.ts
var createDocument = (zodOpenApiObject) => {
  const { paths, webhooks, components = {}, ...rest } = zodOpenApiObject;
  const defaultComponents = getDefaultComponents(
    components,
    zodOpenApiObject.openapi
  );
  const createdPaths = createPaths(paths, defaultComponents);
  const createdWebhooks = createPaths(webhooks, defaultComponents);
  const createdComponents = createComponents(components, defaultComponents);
  return {
    ...rest,
    ...createdPaths && { paths: createdPaths },
    ...createdWebhooks && { webhooks: createdWebhooks },
    ...createdComponents && { components: createdComponents }
  };
};

// src/extendZod.ts
function extendZodWithOpenApi(zod) {
  if (typeof zod.ZodType.prototype.openapi !== "undefined") {
    return;
  }
  zod.ZodType.prototype.openapi = function(openapi) {
    const result = new this.constructor({
      ...this._def,
      openapi
    });
    return result;
  };
  const zodObjectExtend = zod.ZodObject.prototype.extend;
  zod.ZodObject.prototype.extend = function(...args) {
    const extendResult = zodObjectExtend.apply(this, args);
    extendResult._def.extendMetadata = {
      extends: this
    };
    delete extendResult._def.openapi;
    return extendResult;
  };
  const zodObjectOmit = zod.ZodObject.prototype.omit;
  zod.ZodObject.prototype.omit = function(...args) {
    const omitResult = zodObjectOmit.apply(this, args);
    delete omitResult._def.extendMetadata;
    delete omitResult._def.openapi;
    return omitResult;
  };
  const zodObjectPick = zod.ZodObject.prototype.pick;
  zod.ZodObject.prototype.pick = function(...args) {
    const pickResult = zodObjectPick.apply(this, args);
    delete pickResult._def.extendMetadata;
    delete pickResult._def.openapi;
    return pickResult;
  };
}

// src/openapi3-ts/dist/oas30.ts
var oas30_exports = {};

// src/openapi3-ts/dist/oas31.ts
var oas31_exports = {};

// src/api.ts
var api_exports = {};
__export(api_exports, {
  createComponents: () => createComponents,
  createMediaTypeSchema: () => createMediaTypeSchema,
  createParamOrRef: () => createParamOrRef,
  getDefaultComponents: () => getDefaultComponents
});
export {
  api_exports as api,
  createDocument,
  extendZodWithOpenApi,
  oas30_exports as oas30,
  oas31_exports as oas31
};
