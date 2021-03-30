export default interface ITokenGenerator {
  generate(data: object): Promise<string>;
  isValid(token: string): Promise<boolean>;
  decode(token: string): Promise<any>;
}