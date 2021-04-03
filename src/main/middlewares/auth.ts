import { RequestHandler, Request } from 'express';
import JWTTokenGenerator from 'main/JWTTokenGenerator';

const authMiddleware: RequestHandler = async (req: Request) => {
  const errorMessage = 'Invalid Credentials';
  const tokenizer = new JWTTokenGenerator();
  
  if (!req.headers.authorization) throw new Error(errorMessage);

  const [type, token] = req.headers.authorization.split(' ');
  if (type !== 'Bearer') throw new Error(errorMessage);
  const decoded = await tokenizer.decode(token);

  return {
    userId: decoded.userId
  };
}

export default authMiddleware;