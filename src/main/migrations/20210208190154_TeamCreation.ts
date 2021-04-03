import * as Knex from "knex";

const TABLE_NAME = 'team';

export const up = async (knex: Knex): Promise<void> => (
  knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('team_id');
    table.string('team_name').notNullable();
    table.string('team_code', 3).notNullable().unique();
    table.text('team_badge');

    table.integer('team_owner')
      .unsigned()
      .notNullable()
      .references('user_id').inTable('user_account');
  })
);


export const down = async (knex: Knex): Promise<void> => (
  knex.schema.dropTable(TABLE_NAME)
);

