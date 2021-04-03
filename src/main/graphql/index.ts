import { ApolloServer } from 'apollo-server-express';
import typeDefs from 'main/graphql/schema';
import resolvers from 'main/graphql/resolvers';
import ITokenGenerator from 'common/ITokenGenerator';
import JWTTokenGenerator from 'main/JWTTokenGenerator';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const errorMessage = 'Invalid Credentials';
    const tokenizer: ITokenGenerator = new JWTTokenGenerator();
    
    if (!req.headers.authorization) throw new Error(errorMessage);

    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') throw new Error(errorMessage);
    
    const decoded = await tokenizer.decode(token);

    return { userId: decoded.userId }
  }
});

export default server;
