import { ExtendedDMMF, FileWriter, writeModelOrType } from 'zod-prisma-types'

function bindFileWriter(fileWriter: FileWriter) {
  fileWriter.writeImport = fileWriter.writeImport.bind(fileWriter)
  fileWriter.writeImportSet = fileWriter.writeImportSet.bind(fileWriter)
  fileWriter.writeExport = fileWriter.writeExport.bind(fileWriter)
  fileWriter.writeImports = fileWriter.writeImports.bind(fileWriter)
  fileWriter.writeHeading = fileWriter.writeHeading.bind(fileWriter)
  fileWriter.writeJSDoc = fileWriter.writeJSDoc.bind(fileWriter)
}

export function writeSingleFileModelStatements({ dmmf }: { dmmf: ExtendedDMMF }) {
  const fileWriter = new FileWriter()
  bindFileWriter(fileWriter)

  dmmf.datamodel.models.forEach((model) => {
    // fileWriter.writeHeading(`${model.formattedNames.upperCaseSpace}`, 'FAT');
    // fileWriter.writer.newLine();
    writeModelOrType({ fileWriter, dmmf }, model)
    fileWriter.writer.newLine()
  })
  return fileWriter
}
