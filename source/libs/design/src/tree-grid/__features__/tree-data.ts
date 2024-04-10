import { menuItemSchema } from '@flowda/types'
import { z } from 'zod'

export const treeDataInput: z.infer<typeof menuItemSchema>[] = [
    {
        "id": "v6fB",
        "name": "租户管理",
        "slug": "tenant_admin",
        "children": [
            {
                "id": "28Eq",
                "name": "租户和用户",
                "slug": "tenant",
                "children": [
                    {
                        "id": "7mjf",
                        "name": "租户信息",
                        "slug": "tenants"
                    },
                    {
                        "id": "aSYt",
                        "name": "菜单",
                        "slug": "menus"
                    },
                    {
                        "id": "FfOe",
                        "name": "用户",
                        "slug": "users"
                    }
                ]
            }
        ]
    },
    {
        "id": "HD0U",
        "name": "常用工具",
        "slug": "utilities",
        "children": [
            {
                "id": "a2MH",
                "name": "通知",
                "slug": "notification",
                "children": [
                    {
                        "id": "b0yA",
                        "name": "短信通知",
                        "slug": "sent_sms"
                    }
                ]
            },
            {
                "id": "jOej",
                "name": "日志",
                "slug": "log",
                "children": [
                    {
                        "id": "ZcjG",
                        "name": "异常日志",
                        "slug": "request_error_logs"
                    }
                ]
            }
        ]
    }
]