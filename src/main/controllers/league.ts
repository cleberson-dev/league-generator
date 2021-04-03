import { Request, Response } from "express";
import { LeagueRepository, MatchRepository, TeamRepository, UserRepository } from "main/database";
import LeagueFixturesGenerator from "main/LeagueFixturesGenerator";
import { ILeagueRepository, IMatchRepository, ITeamRepository, IUserRepository } from "common/repositories";
import ILeagueFixturesGenerator from "common/ILeagueFixturesGenerator";
import GetUserLeaguesUseCase from "useCases/GetUserLeagues";
import GetLeagueUseCase from "useCases/GetLeague";
import GetLeagueTeamsUseCase from "useCases/GetLeagueTeams";
import CreateLeagueUseCase from "useCases/CreateLeague";
import GetLeagueFixturesUseCase from "useCases/GetLeagueFixtures";
import ITableCalculator from "common/ITableCalculator";
import TableCalculator from "main/TableCalculator";

const leagueRepository: ILeagueRepository = LeagueRepository.getInstance();
const matchRepository: IMatchRepository = MatchRepository.getInstance();
const teamRepository: ITeamRepository = TeamRepository.getInstance();
const userRepository: IUserRepository = UserRepository.getInstance();
const leagueFixturesGenerator: ILeagueFixturesGenerator = new LeagueFixturesGenerator();
const tableCalculator: ITableCalculator = new TableCalculator();

export default class LeagueController {
  static async createLeague(req: Request, res: Response) {
    const useCase = new CreateLeagueUseCase(
      userRepository, leagueRepository, teamRepository, matchRepository,
      leagueFixturesGenerator, tableCalculator
    );
  
    const { name, teams, twoLegged } = req.body;
    const { userId } = req.body; // TODO: GET FROM ANOTHER PLACE
    const result = await useCase.execute({
      userId,
      leagueName: name, leagueTeams: teams,
      twoLegged
    });
  
    return res.status(201).send(result);
  }
  
  static async getUserLeagues(req: Request, res: Response) {
    const useCase = new GetUserLeaguesUseCase(leagueRepository);
  
    const result = await useCase.execute({ userId: req.user?.id as number });
    
    return res.status(200).send(result);
  }

  static async getLeague(req: Request, res: Response) {
    if (!Number.isNaN(req.params.leagueId)) {
      return res.status(404).send({ message: 'Not found' });
    }
  
    const leagueId = Number(req.params.leagueId);
    const useCase = new GetLeagueUseCase(
      leagueRepository, matchRepository, teamRepository, tableCalculator
    );
  
    const result = await useCase.execute({ leagueId });
    
    return res.status(200).send(result);
  }

  static async getLeagueTeams(req: Request, res: Response) {
    if (!Number.isNaN(req.params.leagueId)) {
      return res.status(404).send({ message: 'Not found' });
    }
    
    const leagueId = Number(req.params.leagueId);
    const useCase = new GetLeagueTeamsUseCase(teamRepository);
  
    const result = useCase.execute({ leagueId });
  
    return res.status(200).send(result);
  }

  static async getLeagueFixtures(req: Request, res: Response) {
    if (!Number.isNaN(req.params.leagueId)) {
      return res.status(404).send({ message: 'Not found' });
    }

    const leagueId = Number(req.params.leagueId);
    const useCase = new GetLeagueFixturesUseCase(matchRepository, teamRepository);

    const result = await useCase.execute({ leagueId });

    return res.status(200).send(result);
  }
}