"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDMMF = void 0;
const internals_1 = require("@prisma/internals");
const fs_1 = __importDefault(require("fs"));
const loadDMMF = async (schemaPath) => {
    const datamodel = fs_1.default.readFileSync(schemaPath, 'utf-8');
    const dmmf = await (0, internals_1.getDMMF)({ datamodel });
    return dmmf;
};
exports.loadDMMF = loadDMMF;
//# sourceMappingURL=loadDMMF.js.map