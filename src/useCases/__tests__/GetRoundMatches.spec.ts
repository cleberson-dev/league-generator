import { matchRepository, teamRepository } from './mocks';
import GetRoundMatchesUseCase from 'useCases/GetRoundMatches';
import Match from 'entities/Match';
import Team from 'entities/Team';

let useCase: GetRoundMatchesUseCase;
let mockedMatchRepoFilterByLeagueAndRound: jest.Mock;
let mockedTeamRepoFilterByLeague: jest.Mock;

beforeAll(() => {
  useCase = new GetRoundMatchesUseCase(matchRepository, teamRepository);
  
  mockedMatchRepoFilterByLeagueAndRound = matchRepository.filterByLeagueAndRound as jest.Mock;
  mockedTeamRepoFilterByLeague = teamRepository.filterByLeague as jest.Mock;
  
  const leagueId = 1;
  const roundNumber = 89;
  const finished = false;
  const score = 0;
  mockedMatchRepoFilterByLeagueAndRound.mockReturnValue([
    Match.create({
      id: 1, leagueId, roundNumber, finished,
      home: { id: 1, score }, away: { id: 2, score }
    }),
    Match.create({
      id: 2, leagueId, roundNumber, finished,
      home: { id: 3, score }, away: { id: 4, score }
    }),
    Match.create({
      id: 3, leagueId, roundNumber, finished,
      home: { id: 5, score }, away: { id: 6, score }
    }),
    Match.create({
      id: 4, leagueId, roundNumber, finished,
      home: { id: 7, score }, away: { id: 8, score }
    }),
    Match.create({
      id: 6, leagueId, roundNumber, finished,
      home: { id: 9, score }, away: { id: 10, score }
    })
  ]);

  const ownerId = 1;
  mockedTeamRepoFilterByLeague.mockResolvedValue([
    Team.create({ id: 1, name: 'Team 1', code: 'TM1', ownerId }),
    Team.create({ id: 2, name: 'Team 2', code: 'TM2', ownerId }),
    Team.create({ id: 3, name: 'Team 3', code: 'TM3', ownerId }),
    Team.create({ id: 4, name: 'Team 4', code: 'TM4', ownerId }),
    Team.create({ id: 5, name: 'Team 5', code: 'TM5', ownerId }),
    Team.create({ id: 6, name: 'Team 6', code: 'TM6', ownerId }),
    Team.create({ id: 7, name: 'Team 7', code: 'TM7', ownerId }),
    Team.create({ id: 8, name: 'Team 8', code: 'TM8', ownerId }),
    Team.create({ id: 9, name: 'Team 9', code: 'TM9', ownerId }),
    Team.create({ id: 10, name: 'Team 10', code: 'TM0', ownerId })
  ]);
});

afterEach(() => {
  mockedMatchRepoFilterByLeagueAndRound.mockClear();
  mockedTeamRepoFilterByLeague.mockClear();
});

it('should return correctly', async () => {
  expect.assertions(1);

  const result = await useCase.execute({
    leagueId: 1,
    roundNumber: 1,
  });

  expect(result).toHaveLength(5);
});

it('should pass in 10 as leagueId and 89 as roundNumber to match repo ', async () => {
  expect.assertions(1);

  const leagueId = 10;
  const roundNumber = 89;

  await useCase.execute({ leagueId, roundNumber });

  expect(mockedMatchRepoFilterByLeagueAndRound).toHaveBeenCalledWith(
    leagueId,
    roundNumber,
  );
});
