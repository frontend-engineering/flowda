"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenApi = void 0;
const comment_parser_1 = require("comment-parser");
function getOpenApi(documentation) {
    if (!documentation)
        return {};
    const comments = (0, comment_parser_1.parse)(`
/**
 ${documentation}
 */`);
    if (!Array.isArray(comments[0].tags))
        return {};
    const schemaTags = comments[0].tags.filter((t) => t.tag.indexOf('schema.') > -1);
    if (schemaTags.length === 0)
        return {};
    return schemaTags.reduce((acc, c) => {
        acc[c.tag.replace('schema.', '')] = c.name;
        return acc;
    }, {});
}
exports.getOpenApi = getOpenApi;
//# sourceMappingURL=getOpenApi.js.map