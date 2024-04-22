import * as _ from 'radash'

// 不熟悉泛型或者类型体操，先去掉
// todo: 理想状态 getChangedValues<{ a: string | null, b: boolean | null }>
// 返回值能提示 ret.a
export const getChangedValues = (values: Record<string, unknown>, initialValues: Record<string, unknown>, options: {
    ignoreEmptyString: boolean
} = {
        ignoreEmptyString: true
    }) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
        if (options.ignoreEmptyString && value === '') return acc

        const hasChanged = !_.isEqual(initialValues[key], value)

        if (hasChanged) {
            acc[key] = value
        }

        return acc
    }, {} as Record<string, unknown>)
}
