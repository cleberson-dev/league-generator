import {
  matchRepository, teamRepository, userRepository, leagueRepository
} from "./mocks";
import CreateLeagueUseCase from "useCases/CreateLeague";

let useCase: CreateLeagueUseCase;

const generate = jest.fn().mockReturnValue([]);
const calculate = jest.fn().mockReturnValue([]);

beforeAll(() => {
  useCase = new CreateLeagueUseCase(
    userRepository, leagueRepository, teamRepository, matchRepository,
    { generate },
    { calculate }
  );
});

afterEach(() => {
  generate.mockClear();
  calculate.mockClear();
})

it("should create a league", async () => {
  expect.assertions(2);

  const leagueName = 'Brasileirão';
  const twoLegged = false;

  const result = await useCase.execute({ 
    leagueTeams: [1, 2, 3, 4, 5, 6],
    leagueName,
    userId: 1,
    twoLegged
  });

  expect(result.name).toEqual(leagueName);
  expect(result.twoLegged).toEqual(twoLegged);
});

it("should pass twoLegged prop as false by default on fixture generator's generate method", async () => {
  expect.assertions(2);

  await useCase.execute({
    leagueTeams: [],
    leagueName: 'Brasileirão',
    userId: 1
  });

  const call = generate.mock.calls[0];
  expect(call[0]).toHaveProperty('twoLegged');
  expect(call[0].twoLegged).toEqual(false);
});

it("should pass 6 teams ids to generate function", async () => {
  expect.assertions(2);

  await useCase.execute({ 
    leagueTeams: [1, 2, 3, 4, 5, 6],
    leagueName: 'Brasileirão',
    userId: 1
  });

  const call = generate.mock.calls[0];
  expect(call[0]).toHaveProperty('teamsIds');
  expect(call[0].teamsIds).toHaveLength(6);
});