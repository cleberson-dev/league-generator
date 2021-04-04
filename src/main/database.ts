import knex from 'knex';
import config, { getEnvironmentBasedValue } from 'common/config';

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
      useNullAsDefault: true
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
