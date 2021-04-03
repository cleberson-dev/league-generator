import { leagueRepository } from "./mocks";
import GetUserLeaguesUseCase from "useCases/GetUserLeagues";

let useCase: GetUserLeaguesUseCase;
let mockedFilterByOwner: jest.Mock;

beforeAll(() => {
  useCase = new GetUserLeaguesUseCase(leagueRepository);
  mockedFilterByOwner = leagueRepository.filterByOwner as jest.Mock;
});

afterEach(() => {
  mockedFilterByOwner.mockClear();
});

it("should return 4 leagues", async () => {
  expect.assertions(1);

  const leagues = await useCase.execute({ userId: 1 });

  expect(leagues).toHaveLength(4);
});

it("should not have ownerId property", async () => {
  expect.assertions(4);

  const leagues = await useCase.execute({ userId: 1 });

  leagues.forEach(league => {
    expect(league).not.toHaveProperty('ownerId');
  });
});

it("should pass 4 to filterByOwner repo method", async () => {
  expect.assertions(1);

  const userId = 4;

  await useCase.execute({ userId });

  expect(mockedFilterByOwner).toHaveBeenCalledWith(userId);
});