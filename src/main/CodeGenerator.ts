import ICodeGenerator from "common/ICodeGenerator";

export default class CodeGenerator implements ICodeGenerator {
  generate(text: string) {
    return text.substring(0, 3).toUpperCase();
  }
}