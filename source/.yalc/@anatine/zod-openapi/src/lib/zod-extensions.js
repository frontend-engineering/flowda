/*
This code is heavily inspired by https://github.com/asteasolutions/zod-to-openapi/blob/master/src/zod-extensions.ts
 */
import { extendApi } from './zod-openapi';
export function extendZodWithOpenApi(zod, forceOverride = false) {
    if (!forceOverride && typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
        // This zod instance is already extended with the required methods,
        // doing it again will just result in multiple wrapper methods for
        // `optional` and `nullable`
        return;
    }
    zod.ZodSchema.prototype.openapi = function (metadata) {
        return extendApi(this, metadata);
    };
}
//# sourceMappingURL=zod-extensions.js.map