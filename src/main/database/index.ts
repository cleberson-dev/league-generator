import knex from 'knex';
import config, { getEnvironmentBasedValue } from 'common/config';
import LeagueRepository from 'main/database/LeagueRepository';
import MatchRepository from 'main/database/MatchRepository';
import TeamRepository from 'main/database/TeamRepository';
import UserRepository from 'main/database/UserRepository';

export { LeagueRepository, MatchRepository, TeamRepository, UserRepository };

export default knex(
  getEnvironmentBasedValue<knex.Config>({
    development: {
      client: 'sqlite3',
      connection: {
        filename: './db.sqlite',
      },
      migrations: {
        directory: './src/main/migrations',
      },
    },
    production: {
      client: 'pg',
      connection: {
        host: config.database.host,
        user: config.database.username,
        password: config.database.password,
        database: config.database.name,
      },
    },
  }),
);
