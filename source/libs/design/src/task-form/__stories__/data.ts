/**
 * 当前 task 节点
 * 可写 User.mobile 字段
 */
export const wfCfg = [
    {
        taskDefinitionKey: 'Activity_1rzszxz',
        resource: {
            schemaName: 'CustomerOrderResourceSchema',
            inputMap: {
                /* resource where */'number': /* global vars */'businessKey'
            },
            columns: [
                {
                    name: 'number',
                    access_type: 'read_only'
                },
                {
                    name: 'customerCode',
                    access_type: 'read_only'
                },
                {
                    name: 'contract',
                    access_type: 'read_write'
                }
            ]
        }
    }
]

export const CustomerOrderResourceSchema = {
    "type": "object",
    "name": "CustomerOrder",
    "slug": "customer_orders",
    "table_name": "CustomerOrder",
    "class_name": "CustomerOrder",
    "display_name": "客户订单",
    "primary_key": "id",
    "visible": true,
    "display_primary_key": "true",
    "columns": [
        {
            "column_type": "Int",
            "display_name": "Id",
            "visible": true,
            "access_type": "read_write",
            "name": "id",
            "validators": [
                {
                    "required": true
                }
            ]
        },
        {
            "column_type": "DateTime",
            "display_name": "Created At",
            "visible": true,
            "access_type": "read_only",
            "name": "createdAt",
            "validators": [
                {
                    "required": true
                }
            ]
        },
        {
            "column_type": "DateTime",
            "display_name": "Updated At",
            "visible": true,
            "access_type": "read_only",
            "name": "updatedAt",
            "validators": [
                {
                    "required": true
                }
            ]
        },
        {
            "column_type": "String",
            "display_name": "订单号",
            "visible": true,
            "access_type": "read_write",
            "name": "number",
            "validators": [
                {
                    "required": true
                }
            ]
        },
        {
            "column_type": "String",
            "display_name": "客户编码",
            "visible": true,
            "access_type": "read_write",
            "name": "customerCode",
            "validators": [
                {
                    "required": true
                }
            ]
        },
        {
            "column_type": "String",
            "display_name": "合同",
            "visible": true,
            "access_type": "read_write",
            "plugins": {
                "wf": {
                    "group": "boss"
                }
            },
            "name": "contract",
            "validators": [
                {
                    "required": true
                }
            ]
        }
    ],
    "associations": [
        {
            "display_name": "Customer Order Details",
            "slug": "customer_order_details",
            "model_name": "CustomerOrderDetail",
            "foreign_key": "customerOrderId",
            "primary_key": "id",
            "visible": true,
            "schema_name": "CustomerOrderDetailResourceSchema"
        }
    ],
    "schema_name": "CustomerOrderResourceSchema"
}