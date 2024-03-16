"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = exports.writeModelOrType = exports.writeModelFiles = exports.generateMultipleFiles = exports.generateSingleFile = exports.parseGeneratorConfig = exports.loadDMMF = exports.ExtendedDMMF = void 0;
var classes_1 = require("./classes");
Object.defineProperty(exports, "ExtendedDMMF", { enumerable: true, get: function () { return classes_1.ExtendedDMMF; } });
var loadDMMF_1 = require("./classes/__tests__/utils/loadDMMF");
Object.defineProperty(exports, "loadDMMF", { enumerable: true, get: function () { return loadDMMF_1.loadDMMF; } });
var parseGeneratorConfig_1 = require("./utils/parseGeneratorConfig");
Object.defineProperty(exports, "parseGeneratorConfig", { enumerable: true, get: function () { return parseGeneratorConfig_1.parseGeneratorConfig; } });
var generateSingleFile_1 = require("./generateSingleFile");
Object.defineProperty(exports, "generateSingleFile", { enumerable: true, get: function () { return generateSingleFile_1.generateSingleFile; } });
var generateMultipleFiles_1 = require("./generateMultipleFiles");
Object.defineProperty(exports, "generateMultipleFiles", { enumerable: true, get: function () { return generateMultipleFiles_1.generateMultipleFiles; } });
var writeMultiFileModelFiles_1 = require("./functions/writeMultiFileModelFiles");
Object.defineProperty(exports, "writeModelFiles", { enumerable: true, get: function () { return writeMultiFileModelFiles_1.writeModelFiles; } });
var writeModelOrType_1 = require("./functions/contentWriters/writeModelOrType");
Object.defineProperty(exports, "writeModelOrType", { enumerable: true, get: function () { return writeModelOrType_1.writeModelOrType; } });
var fileWriter_1 = require("./classes/fileWriter");
Object.defineProperty(exports, "FileWriter", { enumerable: true, get: function () { return fileWriter_1.FileWriter; } });
//# sourceMappingURL=generator.js.map