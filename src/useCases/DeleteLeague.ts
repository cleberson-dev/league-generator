import { ILeagueRepository, SavedLeagueId, SavedUserId } from "common/repositories"

type Params = {
  leagueId: SavedLeagueId;
  userId: SavedUserId;
}

type Result = void;


export default class DeleteLeagueUseCase {
  constructor(
    private leagueRepository: ILeagueRepository
  ) { }
  
  async execute(params: Params): Promise<Result> {
    const league = await this.leagueRepository.findOneById(params.leagueId);
    if (league.ownerId !== params.userId) throw Error('Unauthorized');

    await this.leagueRepository.remove(league.id as SavedLeagueId);
  }
}