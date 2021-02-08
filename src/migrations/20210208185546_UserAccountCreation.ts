import * as Knex from "knex";

const TABLE_NAME = 'user_account';

export const up = async (knex: Knex): Promise<void> => (
  knex.schema.createTable(TABLE_NAME, table => {
    table.increments('user_id');
    table.string('username', 32).unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique();
    table.string('presentation_name');
    table.text('profile_picture');
  })
);


export const down = async (knex: Knex): Promise<void> => (
  knex.schema.dropTable(TABLE_NAME)
);

