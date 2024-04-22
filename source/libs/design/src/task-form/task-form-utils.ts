import * as _ from 'radash'

export const getChangedValues = <T extends Record<string, any>>(values: T, initialValues: T, options: {
    ignoreEmptyString: boolean
} = {
        ignoreEmptyString: true
    }) => {
    return Object.entries(values).reduce((acc: Partial<T>, [key, value]) => {
        if (options.ignoreEmptyString && value === '') return acc

        const hasChanged = !_.isEqual(initialValues[key as keyof T], value)

        if (hasChanged) {
            acc[key as keyof T] = value
        }

        return acc
    }, {})
}
