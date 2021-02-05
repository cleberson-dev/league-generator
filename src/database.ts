import knex from 'knex';
import config from './config';

export default knex({
  client: 'pg',
  connection: {
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.name
  }
});