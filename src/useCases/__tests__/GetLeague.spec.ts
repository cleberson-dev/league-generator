import {
  leagueRepository,
  matchRepository, teamRepository
 } from "./mocks";
import GetLeagueUseCase from "useCases/GetLeague";
import { League, Match, Team } from "entities";

let useCase: GetLeagueUseCase;

let mockedLeagueRepoFindOneById = leagueRepository.findOneById as jest.Mock;
let mockedMatchRepoFilterByLeague = matchRepository.filterByLeague as jest.Mock;
let mockedTeamRepoFilterByLeague = teamRepository.filterByLeague as jest.Mock;

const calculate = jest.fn().mockReturnValue([]);

beforeAll(() => {
  useCase = new GetLeagueUseCase(
    leagueRepository,
    matchRepository,
    teamRepository,
    { calculate }
  );

  mockedLeagueRepoFindOneById.mockResolvedValue(
    League.create({ id: 1, name: 'Brasileirão', ownerId: 1, twoLegged: false })
  );
  mockedMatchRepoFilterByLeague.mockResolvedValue([
    Match.create({
      id: 1, leagueId: 1, roundNumber: 1,
      home: { id: 1, score: 0 },
      away: { id: 2, score: 0 },
      finished: false
    }),
    Match.create({
      id: 2, leagueId: 1, roundNumber: 1,
      home: { id: 3, score: 0 },
      away: { id: 4, score: 0 },
      finished: false
    }),
    Match.create({
      id: 3, leagueId: 1, roundNumber: 1,
      home: { id: 5, score: 0 },
      away: { id: 6, score: 0 },
      finished: false
    }),
    Match.create({
      id: 4, leagueId: 1, roundNumber: 1,
      home: { id: 7, score: 3 },
      away: { id: 8, score: 1 },
      finished: true
    }),
    Match.create({
      id: 5, leagueId: 1, roundNumber: 1,
      home: { id: 9, score: 0 },
      away: { id: 10, score: 0 },
      finished: false
    }),
  ]);
  mockedTeamRepoFilterByLeague.mockResolvedValue([
    Team.create({ id: 1, name: 'Flamengo', code: 'FLA', ownerId: 4 }),
    Team.create({ id: 2, name: 'Palmeiras', code: 'PAL', ownerId: 4 }),
    Team.create({ id: 3, name: 'Vasco da Gama', code: 'VAS', ownerId: 4 }),
    Team.create({ id: 4, name: 'Corinthians', code: 'COR', ownerId: 4 }),
    Team.create({ id: 5, name: 'Fluminense', code: 'FLU', ownerId: 4 }),
    Team.create({ id: 6, name: 'Internacional', code: 'INT', ownerId: 4 }),
    Team.create({ id: 7, name: 'Grêmio', code: 'GRE', ownerId: 4 }),
    Team.create({ id: 8, name: 'São Paulo', code: 'SAO', ownerId: 4 }),
    Team.create({ id: 9, name: 'Atlético-MG', code: 'CAM', ownerId: 4 }),
    Team.create({ id: 10, name: 'Cruzeiro', code: 'CRU', ownerId: 4 }),
  ]);
});

afterEach(() => {
  mockedLeagueRepoFindOneById.mockClear();
  mockedMatchRepoFilterByLeague.mockClear();
  mockedTeamRepoFilterByLeague.mockClear();
})

it("should return an id", async () => {
  expect.assertions(1);

  const league = await useCase.execute({ leagueId: 1 });

  expect(league.id).not.toBeUndefined();
})