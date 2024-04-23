import { ReferenceKeySchema } from "@flowda/types";
import { z } from "zod";
// https://github.com/iamkun/dayjs/issues/475#issuecomment-460660048
import dayjs from 'dayjs'

export function getReferenceDisplay(refCol: z.infer<typeof ReferenceKeySchema>, val: any) {
    return `${refCol.reference_type} ${refCol.display_name}#${val[refCol.primary_key]}`
}

export function shortenDatetime(text: string) {
    if (!dayjs(text).isValid()) return text

    let shortFormat
    if (dayjs(text).isSame(dayjs(), 'year')) {
        shortFormat = 'MM-DD HH:mm'
    } else {
        shortFormat = 'YY-MM-DD HH:mm'
    }
    return dayjs(text).format(shortFormat)
}

