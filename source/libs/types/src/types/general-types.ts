export type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>

export interface JSONObject {
  [x: string]: JSONValue
}

export type DefaultFormValueType = Record<string, string | number | undefined>

export type WidgetOption<T> = { id: string; uri: string; title: string; model: T }
