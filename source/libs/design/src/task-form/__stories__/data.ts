import { wfCfgSchema } from "@flowda/types"
import { z } from "zod"



export const taskId = '7df648e4-0054-11ef-907e-26fc8bb373e1'
export const taskDefinitionKey = 'Activity_1yyz484'
export const taskName = '新增生产订单计划排程'
/**
 * 当前 task 节点
 * 可写 User.mobile 字段
 */
export const wfCfgs: z.infer<typeof wfCfgSchema> = [
  {
    taskDefinitionKey: 'Activity_1yyz484',
    resource: {
      schemaName: 'ycdev.CustomerOrderResourceSchema',
      inputMap: {
        /* resource where */ number: /* global vars */ 'businessKey',
      },
      columns: [
        {
          name: 'number',
          access_type: 'read_only',
        },
        {
          name: 'customerCode',
          access_type: 'read_only',
        },
        {
          name: 'contract',
          access_type: 'read_write',
        },
      ],
    },
  },
]
