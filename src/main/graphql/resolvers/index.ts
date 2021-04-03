import {
  query as leagueQuery, mutation as leagueMutation
} from "main/graphql/resolvers/league";
import {
  query as matchQuery, mutation as matchMutation
} from "main/graphql/resolvers/match";
import {
  query as teamQuery
} from "main/graphql/resolvers/team";
import {
  mutation as userMutation
} from "main/graphql/resolvers/user";


export default {
  Query: {
    greeting: (): string => 'Hello, world!',
    ...matchQuery,
    ...leagueQuery,
    ...teamQuery
  },
  Mutation: {
    ...matchMutation,
    ...leagueMutation,
    ...userMutation,
  }
};