import { ILeagueRepository, IMatchRepository, ITeamRepository } from "common/repositories";
import { MatchRepository, TeamRepository, LeagueRepository } from "main/database";
import ChangeMatchUseCase from "useCases/ChangeMatch";
import GetMatchUseCase from "useCases/GetMatch";
import GetRoundMatchesUseCase from "useCases/GetRoundMatches";
import ScoreMatchUseCase from "useCases/ScoreMatch";

const matchRepository: IMatchRepository = MatchRepository.getInstance();
const teamRepository: ITeamRepository = TeamRepository.getInstance();
const leagueRepository: ILeagueRepository = LeagueRepository.getInstance();

export const query = {
  match: async (_: any, args: any) => {
    const useCase = new GetMatchUseCase(
      matchRepository, teamRepository, leagueRepository
    );

    const match = await useCase.execute({ matchId: args.id });

    return {
      id: match.id,
      round: match.roundNumber,
      finished: match.finished,
      league: {
        id: match.league.id,
        name: match.league.name,
        twoLegged: match.league.twoLegged
      },
      home: {
        id: match.home.id,
        name: match.home.name,
        code: match.home.code,
        score: match.home.score
      },
      away: {
        id: match.away.id,
        name: match.away.name,
        code: match.away.code,
        score: match.away.score
      }
    }
  },


  fixturesByRound: async (_: any, args: any) => {
    const useCase = new GetRoundMatchesUseCase(matchRepository, teamRepository);

    const matches = await useCase.execute({
      leagueId: args.leagueId,
      roundNumber: args.round
    });

    return matches.map(match => ({
      id: match.id,
      round: match.roundNumber,
      home: {
        id: match.home.id,
        score: match.home.score
      },
      away: {
        id: match.away.id,
        score: match.away.score
      }
    }));
  }
}


export const mutation = {
  updateMatch: async (_: any, args: any, context: any) => {
    const { matchId, homeScore, awayScore } = args;
    const { userId } = context;

    const useCase = new ChangeMatchUseCase(matchRepository, leagueRepository);

    const match = await useCase.execute({
      matchId, userId,
      homeScore, awayScore
    });

    return {
      id: match.id,
      round: match.roundNumber,
      finished: match.finished,
      home: {
        id: match.home.id,
        score: match.home.score
      },
      away: {
        id: match.away.id,
        score: match.away.score
      },
    }
  },

  score: async (_: any, args: any, context: any) => {
    const useCase = new ScoreMatchUseCase(matchRepository, leagueRepository);

    const match = await useCase.execute({
      matchId: args.matchId,
      teamId: args.scoringTeam,
      userId: context.userId
    });

    return {
      id: match.id,
      round: match.roundNumber,
      finished: match.finished,
      home: {
        id: match.home.id,
        score: match.home.score
      },
      away: {
        id: match.away.id,
        score: match.away.score
      },
    }
  }
}