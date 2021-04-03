import { Request, Response } from "express";
import CodeGenerator from "main/CodeGenerator";
import { TeamRepository } from "main/database";
import { ITeamRepository } from "common/repositories";
import CreateTeamUseCase from "useCases/CreateTeam";
import GetUserTeamsUseCase from "useCases/GetUserTeams";

const codeGenerator = new CodeGenerator();
const teamRepository: ITeamRepository = TeamRepository.getInstance();

export default class TeamController {
  static async getUserTeams(req: Request, res: Response) {
    const useCase = new GetUserTeamsUseCase(teamRepository);

    const { userId } = req.body; // Get from somewhere else

    const result = await useCase.execute({ userId });

    return res.status(200).send(result);
  }

  static async createTeam(req: Request, res: Response) {
    const useCase = new CreateTeamUseCase(
      codeGenerator, teamRepository
    );
  
    const { teamName } = req.body;
    const { userId } = req.body; // TODO: CHANGE USER ID ORIGIN
    const result = await useCase.execute({ teamName, userId });
  
    return res.send(201).send(result);
  }
}