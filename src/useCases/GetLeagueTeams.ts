import Team from "entities/Team"
import { ITeamRepository, SavedLeagueId } from "common/repositories";

type Params = {
  leagueId: SavedLeagueId; 
}
type Result = Omit<Team, "ownerId">[];

export default class GetLeagueTeamsUseCase {
  constructor(
    private teamRepository: ITeamRepository
  ) {}
  
  async execute(request: Params): Promise<Result> {
    const { leagueId } = request;

    const teams = await this.teamRepository.filterByLeague(leagueId);

    return teams.map(team => ({
      id: team.id,
      name: team.name,
      code: team.code
    }));
  }
}
