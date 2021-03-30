export default interface IHasher {
  hash(text: string): Promise<string>;
  matches(text: string, hash: string): Promise<boolean>;
}