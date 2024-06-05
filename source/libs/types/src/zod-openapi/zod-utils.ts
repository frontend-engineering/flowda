// 从 https://github.com/risen228/nestjs-zod 提取
// 提取的原因是去掉 nestjs 等 node 依赖
import { ZodSchema, ZodTypeDef } from 'zod'

export interface ZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput> {
  new (): TOutput

  isZodDto: true
  schema: ZodSchema<TOutput, TDef, TInput>

  create(input: unknown): TOutput
}

export function createZodDto<TOutput = any, TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput>(
  schema: ZodSchema<TOutput, TDef, TInput>,
) {
  class AugmentedZodDto {
    public static isZodDto = true
    public static schema = schema

    public static create(input: unknown) {
      return this.schema.parse(input)
    }
  }

  return AugmentedZodDto as unknown as ZodDto<TOutput, TDef, TInput>
}
