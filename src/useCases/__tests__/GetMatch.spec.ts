import {
  matchRepository, teamRepository, leagueRepository
} from './mocks';
import GetMatchUseCase from 'useCases/GetMatch';

let useCase: GetMatchUseCase;

beforeAll(() => {
  useCase = new GetMatchUseCase(
    matchRepository, teamRepository, leagueRepository
  );
});

it("should return a Match", async () => {
  expect.assertions(9);

  const matchId = 1;
  const result = await useCase.execute({ matchId });

  expect(result.id).not.toBeUndefined();
  expect(result.finished).not.toBeUndefined();
  expect(result.league.id).not.toBeUndefined();
  expect(result.league.twoLegged).not.toBeUndefined();
  expect(result.home.id).not.toBeUndefined();
  expect(result.home.score).not.toBeUndefined();
  expect(result.away.id).not.toBeUndefined();
  expect(result.away.score).not.toBeUndefined();
  expect(result.id).toEqual(matchId);
});