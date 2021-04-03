import { teamRepository } from "./mocks";
import GetLeagueTeamsUseCase from "useCases/GetLeagueTeams";

let useCase: GetLeagueTeamsUseCase;
let mockedFilterByLeague = teamRepository.filterByLeague as jest.Mock;

beforeAll(() => {
  useCase = new GetLeagueTeamsUseCase(teamRepository);
});

afterEach(() => {
  mockedFilterByLeague.mockClear();
});

it("should pass in 11 as leagueId to match repo's method", async () => {
  expect.assertions(2);

  const leagueId = 11;
  await useCase.execute({ leagueId });

  expect(mockedFilterByLeague).toHaveBeenCalledTimes(1);
  expect(mockedFilterByLeague).toHaveBeenCalledWith(leagueId);
});

it("should not include the ownerId property", async () => {
  expect.assertions(6);

  const teams = await useCase.execute({ leagueId: 1 });

  teams.forEach(team => {
    expect(team).not.toHaveProperty('ownerId');
  })
});