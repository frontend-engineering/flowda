"use strict";
const { generatorHandler } = require('@prisma/generator-helper');
const { z } = require('zod');
const { DirectoryHelper, ExtendedDMMF, generateMultipleFiles, generateSingleFile, skipGenerator, parseGeneratorConfig } = require('./generator.bundle.js');
const outputSchema = z.object({
    fromEnvVar: z.string().nullable(),
    value: z.string({ required_error: 'No output path specified' }),
});
generatorHandler({
    onManifest: () => {
        return {
            defaultOutput: './generated/zod',
            prettyName: 'Zod Prisma Types',
        };
    },
    onGenerate: async (generatorOptions) => {
        if (skipGenerator())
            return;
        const config = parseGeneratorConfig(generatorOptions);
        const output = outputSchema.parse(generatorOptions.generator.output);
        const extendedDMMF = new ExtendedDMMF(generatorOptions.dmmf, config);
        DirectoryHelper.removeDir(output.value);
        DirectoryHelper.createDir(output.value);
        if (extendedDMMF.generatorConfig.useMultipleFiles) {
            return generateMultipleFiles({
                dmmf: extendedDMMF,
                path: output.value,
            });
        }
        return generateSingleFile({
            dmmf: extendedDMMF,
            path: output.value,
        });
    },
});
//# sourceMappingURL=generatorHandler.js.map