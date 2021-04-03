import { teamRepository } from './mocks';
import CreateTeamUseCase from 'useCases/CreateTeam';

let useCase: CreateTeamUseCase;

const generate = jest.fn().mockReturnValue('FLA');  
beforeAll(() => {
  useCase = new CreateTeamUseCase(
    { generate },
    teamRepository
  );
});

it("should return team name and code", async () => {
  expect.assertions(2);
  
  const teamName = 'Flamengo';

  const result = await useCase.execute({
    userId: 1,
    teamName
  });

  expect(result.name).toEqual(teamName);
  expect(result.code).toEqual('FLA');
});

it("should pass the team name to 'generator' function", async () => {
  expect.assertions(1);

  const teamName = 'Flamengo';
  
  await useCase.execute({
    userId: 1,
    teamName
  });

  expect(generate).toHaveBeenLastCalledWith(teamName);
});