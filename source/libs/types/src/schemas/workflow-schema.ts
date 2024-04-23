import { z } from "zod";

export const taskSchema = z.object({
    id: z.string(),
    name: z.string(),
    assignee: z.string(),
    executionId: z.string(),
    processDefinitionId: z.string(),
    processInstanceId: z.string(),
    taskDefinitionKey: z.string(),
    tenantId: z.string(),
})

// 可能后续再增加 或者先请求一次后端
export const taskUriSchema = taskSchema.pick({
    id: true,
    name: true,
    taskDefinitionKey: true
})

// 逐步增强，现在仅支持单个 resource 
// 后续可支持多个，且不仅仅是 resource 可以是 view 甚至 plugin
export const wfCfgSchema = z.array(z.object({
    taskDefinitionKey: z.string(),
    resource: z.object({
        schemaName: z.string(),
        inputMap: z.record(z.string(), z.string()),
        columns: z.array(z.object({
            name: z.string(),
            access_type: z.union([z.literal('read_only'), z.literal('read_write')])
        }))
    })
}))

