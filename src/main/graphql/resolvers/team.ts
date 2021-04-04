import { ITeamRepository, SavedTeamId } from "common/repositories"
import { TeamRepository } from "main/repositories"
import GetUserTeamsUseCase from "useCases/GetUserTeams"

const teamRepository: ITeamRepository = TeamRepository.getInstance();

export const query = {
  myTeams: async (_: any, __: any, context: any) => {
    const useCase = new GetUserTeamsUseCase(teamRepository);

    const teams = await useCase.execute({ userId: context.userId });

    return teams.map(team => ({
      id: team.id as SavedTeamId,
      name: team.name,
      code: team.code
    }));
  }
}