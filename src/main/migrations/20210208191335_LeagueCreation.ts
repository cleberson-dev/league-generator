import * as Knex from "knex";

const TABLE_NAME = 'league';

export const up = async (knex: Knex): Promise<void> => (
  knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('league_id');
    table.string('league_name').notNullable();
    table.boolean('two_legged').defaultTo(false);
    table.text('league_badge');

    table.integer('league_owner')
      .unsigned()
      .notNullable()
      .references('user_id').inTable('user_account');
  })
);


export const down = async (knex: Knex): Promise<void> => (
  knex.schema.dropTable(TABLE_NAME)
);

