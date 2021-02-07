import knex from 'knex';
import config, { EnvironmentTypes } from './config';

const dbConfigs: Record<EnvironmentTypes, knex.Config> = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: config.database.host,
      user: config.database.username,
      password: config.database.password,
      database: config.database.name
    }
  }
}

export default knex(dbConfigs[config.environment()]);