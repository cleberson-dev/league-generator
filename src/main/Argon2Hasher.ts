import argon2 from 'argon2';
import IHasher from "common/IHasher";

type Argon2HashOptions = Parameters<typeof argon2.hash>[1];

export default class Argon2Hasher implements IHasher {
  async hash(text: string) {
    const opts: Argon2HashOptions  = {
      hashLength: 40, 
    }
    const hashedText = await argon2.hash(text, opts);

    return hashedText;
  }

  async matches(text: string, hash: string) {
    const doMatch = await argon2.verify(hash, text);

    return doMatch;
  }
}