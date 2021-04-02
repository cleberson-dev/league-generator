import { ILeagueRepository, IMatchRepository, ITeamRepository, IUserRepository } from "common/repositories";
import Match from "entities/Match";
import Team from "entities/Team";
import User from "entities/User";
import League from "entities/League";

export const leagueRepository: ILeagueRepository = {
  save: jest.fn(),
  filterByOwner: jest.fn().mockResolvedValue([
    League.create({ id: 1, name: 'League #1', ownerId: 2, twoLegged: false }),
    League.create({ id: 2, name: 'League #2', ownerId: 2, twoLegged: true }),
    League.create({ id: 3, name: 'League #3', ownerId: 2, twoLegged: true }),
    League.create({ id: 4, name: 'League #4', ownerId: 2, twoLegged: false })
  ]),
  findOneById: jest.fn().mockResolvedValue(League.create({
    id: 5,
    name: 'Brasileirão',
    ownerId: 10,
    twoLegged: true
  })),
  remove: jest.fn()
}

export const matchRepository: IMatchRepository = {
  save: jest.fn(),
  addMatchesToLeague: jest.fn(),
  filterByLeague: jest.fn().mockResolvedValue([]),
  filterByLeagueAndRound: jest.fn().mockResolvedValue([
    Match.create({
      id: 1,
      leagueId: 1,
      roundNumber: 1,
      home: { id: 1, score: 0 },
      away: { id: 2, score: 0 },
      finished: false,
    }),
    Match.create({
      id: 2,
      leagueId: 1,
      roundNumber: 1,
      home: { id: 3, score: 0 },
      away: { id: 4, score: 0 },
      finished: false,
    }),
    Match.create({
      id: 3,
      leagueId: 1,
      roundNumber: 1,
      home: { id: 5, score: 0 },
      away: { id: 6, score: 0 },
      finished: false,
    }),
    Match.create({
      id: 4,
      leagueId: 1,
      roundNumber: 1,
      home: { id: 7, score: 3 },
      away: { id: 8, score: 1 },
      finished: true,
    }),
    Match.create({
      id: 5,
      leagueId: 1,
      roundNumber: 1,
      home: { id: 9, score: 0 },
      away: { id: 10, score: 0 },
      finished: false,
    }),
  ]),
  filterByLeagueTeam: jest.fn().mockResolvedValue([]),
  findOneById: jest.fn().mockResolvedValue(Match.create({
    id: 1,
    leagueId: 1,
    roundNumber: 1,
    home: { id: 1, score: 0 },
    away: { id: 2, score: 1 },
    finished: false
  })),
}

export const teamRepository: ITeamRepository = {
  save: jest.fn(),
  addTeamsToLeague: jest.fn(),
  filterByLeague: jest.fn().mockResolvedValue([
    Team.create({ id: 1, name: 'Flamengo', code: 'FLA', ownerId: 4 }),
    Team.create({ id: 2, name: 'Palmeiras', code: 'PAL', ownerId: 4 }),
    Team.create({ id: 3, name: 'Vasco da Gama', code: 'VAS', ownerId: 4 }),
    Team.create({ id: 4, name: 'Corinthians', code: 'COR', ownerId: 4 }),
    Team.create({ id: 5, name: 'Fluminense', code: 'FLU', ownerId: 4 }),
    Team.create({ id: 6, name: 'Internacional', code: 'INT', ownerId: 4 }),
  ]),
  filterByOwner: jest.fn().mockResolvedValue([
    Team.create({ id: 1, name: 'Flamengo', code: 'FLA', ownerId: 1 }),
    Team.create({ id: 2, name: 'São Paulo', code: 'SAO', ownerId: 1 }),
    Team.create({ id: 3, name: 'Fluminense', code: 'FLU', ownerId: 1 }),
    Team.create({ id: 4, name: 'Vasco', code: 'VAS', ownerId: 1 }),
    Team.create({ id: 5, name: 'Palmeiras', code: 'PAL', ownerId: 1 }),
    Team.create({ id: 6, name: 'Santos', code: 'SAN', ownerId: 1 }),
  ]),
  findOneById: jest.fn().mockResolvedValue(Team.create({
    id: 1, name: 'Flamengo', code: 'FLA', ownerId: 1
  })),
}

export const userRepository: IUserRepository = {
  save: jest.fn(),
  findOneById: jest.fn().mockResolvedValue(User.create({
    id: 1,
    username: 'clebersondev',
    password: 'supersafepass',
    email: 'cleberson.dev@gmail.com',
    presentationName: 'Cleberson Jr.'
  })),
  findOneByUsernameOrEmail: jest.fn().mockResolvedValue(User.create({
    id: 4,
    username: 'superuser',
    password: 'strongestever',
    email: 'email@email.com',
    presentationName: 'SuperUser'
  }))
}