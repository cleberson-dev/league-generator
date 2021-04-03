import * as Knex from "knex";

const TABLE_NAME = 'match';

export const up = async (knex: Knex): Promise<void> => (
  knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('match_id');
    table.integer('round_number').notNullable();
    table.integer('home_score').unsigned().defaultTo(0);
    table.integer('away_score').unsigned().defaultTo(0);
    table.string('match_place');
    table.dateTime('match_time');
    table.boolean('is_finished').defaultTo(false);

    table.bigInteger('league')
      .unsigned().notNullable()
      .references('league_id').inTable('league')
      .onDelete('CASCADE');
    
    table.bigInteger('home_team')
      .unsigned().notNullable()
      .references('team_id').inTable('team');
    
    table.bigInteger('away_team')
      .unsigned().notNullable()
      .references('team_id').inTable('team');
  })
);


export const down = async (knex: Knex): Promise<void> => (
  knex.schema.dropTable(TABLE_NAME)
);

