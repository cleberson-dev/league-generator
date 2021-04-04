import { Request, Response } from "express";
import { ILeagueRepository, IMatchRepository, ITeamRepository } from "common/repositories";
import { LeagueRepository, MatchRepository, TeamRepository } from "main/repositories";
import ChangeMatchUseCase from "useCases/ChangeMatch";
import GetMatchUseCase from "useCases/GetMatch";

const matchRepository: IMatchRepository = MatchRepository.getInstance();
const leagueRepository: ILeagueRepository = LeagueRepository.getInstance();
const teamRepository: ITeamRepository = TeamRepository.getInstance();

export default class MatchController {
  static async changeMatch(req: Request, res: Response) {
    const useCase = new ChangeMatchUseCase(matchRepository, leagueRepository);

    const matchId = Number(req.params.matchId);
    const { userId } = req.body; // GET USER ID FROM SOMEWHERE ELSE
    const { homeScore, awayScore } = req.body;
    
    const result = await useCase.execute({ userId, matchId, homeScore, awayScore });

    return res.status(200).send(result);
  }


  static async getMatch(req: Request, res: Response) {
    if (Number.isNaN(req.params.matchId)) {
      return res.status(404).send({ message: 'Match not found' });
    }

    const useCase = new GetMatchUseCase(matchRepository, teamRepository, leagueRepository);
    const matchId = Number(req.params.matchId);

    const result = await useCase.execute({ matchId });

    return res.status(200).send(result);
  }
}