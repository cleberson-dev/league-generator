import Team from "entities/Team";
import { ITeamRepository, SavedTeamId, SavedUserId } from "common/repositories";
import ICodeGenerator from "common/ICodeGenerator";

export type Params = {
  userId: SavedUserId;
  teamName: string;
}
export type Result = Required<Omit<Team, "ownerId">>;

export default class CreateTeamUseCase {
  constructor(
    private codeGenerator: ICodeGenerator,
    private teamRepository: ITeamRepository
  ) {}

  async execute(params: Params): Promise<Result> {
    const teamCode = this.codeGenerator.generate(params.teamName)
    
    const newTeam = Team.create({
      name: params.teamName,
      ownerId: params.userId,
      code: teamCode
    });
    
    await this.teamRepository.save(newTeam);

    return {
      id: newTeam.id as SavedTeamId,
      name: newTeam.name,
      code: newTeam.code
    }
  }
}