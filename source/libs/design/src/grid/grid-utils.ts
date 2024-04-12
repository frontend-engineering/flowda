import { ReferenceKeySchema } from "@flowda/types";
import { z } from "zod";

export function getReferenceDisplay(refCol: z.infer<typeof ReferenceKeySchema>, val: any) {
    return `${refCol.reference_type} ${refCol.display_name}#${val[refCol.primary_key]}`
}