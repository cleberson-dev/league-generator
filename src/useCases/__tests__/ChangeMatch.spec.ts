import { matchRepository, leagueRepository } from "./mocks";
import ChangeMatchUseCase from "useCases/ChangeMatch";
import League from "entities/League";

let useCase: ChangeMatchUseCase;

let mockedMatchRepoFindOneById = matchRepository.findOneById as jest.Mock;
let mockedLeagueRepoFindOneById= leagueRepository.findOneById as jest.Mock;

beforeAll(() => {
  useCase = new ChangeMatchUseCase(matchRepository, leagueRepository);
});

afterEach(() => {
  mockedMatchRepoFindOneById.mockClear();
  mockedLeagueRepoFindOneById.mockClear();
});

it("should pass the provided match id to match repository", async () => {
  expect.assertions(1);

  const ownerId = 2;

  mockedLeagueRepoFindOneById.mockResolvedValue(League.create({
    id: 1, name: 'League 1',
    ownerId, twoLegged: false
  }));

  const matchId = 1;
  await useCase.execute({
    matchId,
    userId: ownerId,
    homeScore: 1,
    awayScore: 1
  });

  expect(mockedMatchRepoFindOneById).toHaveBeenCalledWith(matchId);
});