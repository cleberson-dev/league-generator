import Team from "entities/Team"
import { ITeamRepository, SavedUserId } from "common/repositories";

type Params = {
  userId: SavedUserId; 
}
type Result = Omit<Team, "ownerId">[];

export default class GetUserTeamsUseCase {
  constructor(
    private teamRepository: ITeamRepository
  ) {}
  
  async execute(params: Params): Promise<Result> {
    const { userId } = params;

    const teams = await this.teamRepository.filterByOwner(userId);

    return teams.map(team => ({
      id: team.id,
      name: team.name,
      code: team.code
    }));
  }
}