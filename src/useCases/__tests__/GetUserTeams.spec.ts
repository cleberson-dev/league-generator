import { teamRepository } from "./mocks";
import GetUserTeamsUseCase from "useCases/GetUserTeams";

let useCase: GetUserTeamsUseCase;

let mockedTeamRepoFilterByOwner: jest.Mock;

beforeAll(() => {
  useCase = new GetUserTeamsUseCase(teamRepository);
  mockedTeamRepoFilterByOwner = teamRepository.filterByOwner as jest.Mock;
});

afterEach(() => {
  mockedTeamRepoFilterByOwner.mockClear();
})

it("should get teams by user id", async () => {
  expect.assertions(1);
  
  const userId = 10;
  await useCase.execute({ userId });

  expect(mockedTeamRepoFilterByOwner).toHaveBeenCalledWith(userId);
});

it("should call the repository method just once", async () => {
  expect.assertions(1);
  
  const userId = 1;
  await useCase.execute({ userId });

  expect(mockedTeamRepoFilterByOwner).toHaveBeenCalledTimes(1);
});