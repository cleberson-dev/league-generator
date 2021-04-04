import db from 'main/database';
import League from 'entities/League';
import {
  ILeagueRepository,
  SavedLeagueId,
  SavedUserId,
} from 'common/repositories';

export default class LeagueRepository implements ILeagueRepository {
  private static _instance: ILeagueRepository = new LeagueRepository();

  private table = db('league');

  private constructor() {}
  
  static getInstance() {
    return LeagueRepository._instance;
  }
  
  async findOneById(id: SavedLeagueId): Promise<League> {
    const savedLeague = await this.table.where({ league_id: id }).first();

    return League.create({
      id: savedLeague.league_id,
      name: savedLeague.league_name,
      ownerId: savedLeague.league_owner,
      twoLegged: savedLeague.two_legged,
    });
  }

  async filterByOwner(ownerId: SavedUserId): Promise<League[]> {
    const ownerLeagues = await this.table.where({
      league_owner: ownerId,
    });
    return ownerLeagues.map((savedLeague: any) =>
      League.create({
        id: savedLeague.league_id,
        name: savedLeague.league_name,
        ownerId: savedLeague.league_owner,
        twoLegged: savedLeague.two_legged,
      }),
    );
  }

  async save(newLeague: League): Promise<void> {
    const payload = {
      league_name: newLeague.name,
      two_legged: newLeague.twoLegged,
      league_owner: newLeague.ownerId
    };

    if (newLeague.id) {
      await this.table
        .where({ league_id: newLeague.id })
        .first()
        .update(payload);
    } else {
      const [id] = await this.table
        .insert(payload)
        .returning('league_id');
      newLeague.id = id;
    }
  }

  async remove(id: SavedLeagueId) {
    await this.table
      .where({ league_id: id })
      .delete()
      .first();
  }
}
