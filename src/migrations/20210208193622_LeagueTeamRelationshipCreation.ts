import * as Knex from "knex";

const TABLE_NAME = 'league_team';

export const up = async (knex: Knex): Promise<void> => (
  knex.schema.createTable(TABLE_NAME, table => {
    table.bigInteger('league_id').unsigned().notNullable()
      .references('league_id').inTable('league');
    table.bigInteger('team_id').unsigned().notNullable()
      .references('team_id').inTable('team');
  })
);


export const down = async (knex: Knex): Promise<void> => (
  knex.schema.dropTable(TABLE_NAME)
);

