import db from 'main/database';
import Team from 'entities/Team';
import {
  ITeamRepository,
  SavedLeagueId,
  SavedTeamId,
  SavedUserId,
} from 'common/repositories';

export default class TeamRepository implements ITeamRepository {
  private static _instance: ITeamRepository = new TeamRepository();

  private constructor() {}
  
  static getInstance() {
    return TeamRepository._instance;
  }
  
  async save(team: Team): Promise<void> {
    const table = db('team');

    const payload = {
      team_name: team.name,
      team_code: team.code,
      team_owner: team.ownerId
    };

    if (team.id) {
      await table.where({ team_id: team.id }).first().update(payload);
    } else {
      const [id] = await table.insert(payload).returning('team_id');
      team.id = id;
    }
  }

  async findOneById(id: SavedTeamId): Promise<Team> {
    const table = db('team');
    const savedTeam = await table.where({ team_id: id }).first();

    return Team.create({
      id: savedTeam.team_id,
      name: savedTeam.team_name,
      code: savedTeam.team_code,
      ownerId: savedTeam.team_owner,
    });
  }

  async filterByLeague(leagueId: SavedLeagueId): Promise<Team[]> {
    const leagueTeamIds = await db('league_team')
      .select('team_id')
      .where({ league_id: leagueId });

    const leagueTeams = await db('team').whereIn(
      'team_id',
      leagueTeamIds,
    );

    return leagueTeams.map((savedTeam) =>
      Team.create({
        id: savedTeam.team_id,
        name: savedTeam.team_name,
        code: savedTeam.team_code,
        ownerId: savedTeam.team_owner,
      }),
    );
  }

  async filterByOwner(ownerId: SavedUserId): Promise<Team[]> {
    const ownerTeams = await db('team').where({
      team_owner: ownerId,
    });
    return ownerTeams.map((savedTeam) =>
      Team.create({
        id: savedTeam.team_id,
        name: savedTeam.team_name,
        code: savedTeam.team_code,
        ownerId: savedTeam.team_owner,
      }),
    );
  }

  async addTeamsToLeague(
    teamIds: SavedTeamId[],
    leagueId: SavedLeagueId,
  ): Promise<void> {
    const leagueTeams = teamIds.map((teamId) => ({
      team_id: teamId,
      league_id: leagueId,
    }));
    await db.transaction((tr) =>
      db.batchInsert('league_team', leagueTeams).transacting(tr),
    );
  }
}
