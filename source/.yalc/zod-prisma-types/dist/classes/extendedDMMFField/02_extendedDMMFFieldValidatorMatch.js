"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFFieldValidatorMatch = exports.VALIDATOR_TYPE_REGEX = void 0;
const _01_extendedDMMFFieldBase_1 = require("./01_extendedDMMFFieldBase");
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
exports.VALIDATOR_TYPE_REGEX = /@zod\.(?<type>[\w]+){1}(?<customErrors>\([{][\w\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} (),'"。、:+*#!§$%&/{}[\]=?~><°^\\-]+[}]\))?(?<validatorPattern>[\w\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han} (),.'"。、\\:+*#!§$%&/{}[\]=?~><°^\\-]*[)])?/u;
class ExtendedDMMFFieldValidatorMatch extends _01_extendedDMMFFieldBase_1.ExtendedDMMFFieldBase {
    constructor(field, generatorConfig, modelName) {
        super(field, generatorConfig, modelName);
        Object.defineProperty(this, "_validatorMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "openapi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clearedDocumentation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._validatorMatch = this._getValidatorMatchArray();
        this.openapi = (0, utils_1.getOpenApi)(this.documentation);
        this.clearedDocumentation = this._getClearedDocumentation();
    }
    _getValidatorMatchArray() {
        var _a;
        if (!this.documentation)
            return;
        return (_a = this.documentation.match(exports.VALIDATOR_TYPE_REGEX)) !== null && _a !== void 0 ? _a : undefined;
    }
    _getClearedDocumentation() {
        if (!this.documentation)
            return;
        return (this.documentation
            .replace(exports.VALIDATOR_TYPE_REGEX, '')
            .replace(constants_1.JSDOC_SCHEMA_TAG_REGEX, '')
            .trim() || undefined);
    }
}
exports.ExtendedDMMFFieldValidatorMatch = ExtendedDMMFFieldValidatorMatch;
//# sourceMappingURL=02_extendedDMMFFieldValidatorMatch.js.map