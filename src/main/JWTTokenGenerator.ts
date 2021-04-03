import jwt from 'jsonwebtoken';
import ITokenGenerator from "common/ITokenGenerator";
import config from 'common/config';

export default class JWTTokenGenerator implements ITokenGenerator {
  async generate(data: object) {
    const token = jwt.sign(data, config.tokenSecret);

    return token;
  }
  
  async isValid(token: string) {
    try {
      jwt.verify(token, config.tokenSecret);
      return true;
    } catch {
      return false;
    }
  }

  async decode(token: string) {
    if (!this.isValid(token)) throw Error('Token is not valid');
    
    const decoded = jwt.decode(token, { json: true });
    if (!decoded) throw Error('JWT: Error while decoding');
    
    return decoded;
  }
}