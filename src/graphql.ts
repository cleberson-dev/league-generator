import { gql, ApolloServer } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

export const resolvers = {
  Query: {
    greeting: (): string => 'Hello, world!'
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

export default server;