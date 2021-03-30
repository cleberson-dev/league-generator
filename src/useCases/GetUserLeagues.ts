import League from "entities/League";
import { ILeagueRepository, SavedUserId } from "common/repositories";

type Params = {
  userId: SavedUserId;
};
type Result = Omit<League, "ownerId">[];

export default class GetUserLeaguesUseCase {
  constructor(
    private leagueRepository: ILeagueRepository
  ) {}
  
  async execute(params: Params): Promise<Result> {
    const leagues = await this.leagueRepository.filterByOwner(params.userId);

    return leagues.map(league => ({
      id: league.id,
      name: league.name,
      twoLegged: league.twoLegged as boolean
    }));
  }
}