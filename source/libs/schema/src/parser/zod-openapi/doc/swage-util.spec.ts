import * as fs from 'fs-extra'
import * as path from 'path'

import { convert } from './swage-util'

describe('swage util', () => {
    it('can convert zod-openapi createDocument to swage compatible format', () => {
        const input = fs.readJSONSync(path.join(__dirname, './__fixtures__/sample-openapi3.json'))
        const output = convert(input)
        expect(output).toMatchInlineSnapshot(`
      {
        "definitions": {
          "NormalResponse": {
            "properties": {
              "code": {
                "type": "string",
              },
              "message": {
                "type": "string",
              },
            },
            "required": [
              "code",
              "message",
            ],
            "title": "NormalResponse",
            "type": "object",
          },
          "WcsNoticeMouldIntoStockSchema": {
            "properties": {
              "goodsList": {
                "items": {
                  "properties": {
                    "containerCode": {
                      "description": "箱码",
                      "example": "containerCode",
                      "type": "string",
                    },
                  },
                  "required": [
                    "containerCode",
                  ],
                  "type": "object",
                },
                "type": "array",
              },
              "noticeId": {
                "description": "单据号",
                "example": "XSCK00001",
                "type": "number",
              },
            },
            "required": [
              "noticeId",
              "goodsList",
            ],
            "title": "WcsNoticeMouldIntoStockSchema",
            "type": "object",
          },
        },
        "info": {
          "title": "云壶 WMS Open API",
          "version": "2.0",
        },
        "openapi": "3.0.1",
        "paths": {
          "/wms/noticeMouldIntoStock": {
            "post": {
              "operationId": "模具入库通知",
              "requestBody": {
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/definitions/WcsNoticeMouldIntoStockSchema",
                    },
                  },
                },
              },
              "responses": {
                "200": {
                  "content": {
                    "application/json": {
                      "schema": {
                        "$ref": "#/definitions/NormalResponse",
                      },
                    },
                  },
                  "description": "200 OK",
                },
              },
              "summary": "模具入库通知",
              "tags": [
                "wms模具入库",
              ],
            },
          },
        },
      }
    `)
    })
})
