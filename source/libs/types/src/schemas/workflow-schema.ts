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