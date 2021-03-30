import { PropType } from 'common/utils';
import League from 'entities/League';
import Match from 'entities/Match';
import Team from 'entities/Team';
import User from 'entities/User';

export type SavedUserId = NonNullable<PropType<User, 'id'>>;
export type SavedLeagueId = NonNullable<PropType<League, 'id'>>;
export type SavedTeamId = NonNullable<PropType<Team, 'id'>>;
export type SavedMatchId = NonNullable<PropType<Match, 'id'>>;

export interface IUserRepository {
  save(newUser: User): Promise<void>;
  findOneById(id: SavedUserId): Promise<User>;
  findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User>;
}

export interface ILeagueRepository {
  save(league: League): Promise<void>;
  findOneById(id: SavedLeagueId): Promise<League>;
  filterByOwner(ownerId: SavedUserId): Promise<League[]>;
  remove(id: SavedLeagueId): Promise<void>;
}

export interface ITeamRepository {
  save(team: Team): Promise<void>;
  findOneById(id: SavedTeamId): Promise<Team>;
  filterByLeague(leagueId: SavedLeagueId): Promise<Team[]>;
  filterByOwner(ownerId: SavedUserId): Promise<Team[]>;
  addTeamsToLeague(
    teamIds: SavedTeamId[],
    leagueId: SavedLeagueId,
  ): Promise<void>;
}

export interface IMatchRepository {
  save(match: Match): Promise<void>;
  findOneById(id: SavedMatchId): Promise<Match>;
  filterByLeague(leagueId: SavedLeagueId): Promise<Match[]>;
  filterByLeagueTeam(
    leagueId: SavedLeagueId,
    teamId: SavedTeamId,
  ): Promise<Match[]>;
  filterByLeagueAndRound(
    leagueId: SavedLeagueId,
    roundNumber: number,
  ): Promise<Match[]>;
  addMatchesToLeague(matches: Match[]): Promise<void>;
}
