import ITableCalculator from "common/ITableCalculator";
import { ILeagueRepository, IMatchRepository, ITeamRepository, IUserRepository, SavedLeagueId } from "common/repositories";
import { MatchRepository, TeamRepository, LeagueRepository, UserRepository } from "main/repositories";
import LeagueFixturesGenerator from "main/LeagueFixturesGenerator";
import TableCalculator from "main/TableCalculator";
import CreateLeagueUseCase from "useCases/CreateLeague";
import DeleteLeagueUseCase from "useCases/DeleteLeague";
import GetLeagueUseCase from "useCases/GetLeague";
import GetUserLeaguesUseCase from "useCases/GetUserLeagues";

const matchRepository: IMatchRepository = MatchRepository.getInstance();
const teamRepository: ITeamRepository = TeamRepository.getInstance();
const leagueRepository: ILeagueRepository = LeagueRepository.getInstance();
const userRepository: IUserRepository = UserRepository.getInstance();
const tableCalculator: ITableCalculator = new TableCalculator();

export const query = {
  league: async (_: any, args: any) => {
    const useCase = new GetLeagueUseCase(
      leagueRepository, matchRepository, teamRepository,
      tableCalculator
    );

    const league = await useCase.execute({ leagueId: args.id });

    return {
      id: league.id,
      name: league.name,
      twoLegged: league.twoLegged,
      teams: league.teams,
      table: league.table,
      fixtures: league.fixtures
    }
  },

  myLeagues: async (_: any, __: any, context: any) => {
    const useCase = new GetUserLeaguesUseCase(leagueRepository);

    const leagues = await useCase.execute({ userId: context.userId });
    return leagues.map(league => ({
      id: league.id as SavedLeagueId,
      name: league.name,
      twoLegged: league.twoLegged
    }));
  }
}

export const mutation = {
  createLeague: async (_: any, args: any, context: any) => {
    const { name, teamIds, twoLegged } = args;
    const { userId } = context;

    const useCase = new CreateLeagueUseCase(
      userRepository, leagueRepository, teamRepository, matchRepository,
      new LeagueFixturesGenerator(),
      new TableCalculator()
    );

    const league = await useCase.execute({
      leagueName: name,
      leagueTeams: teamIds,
      userId,
      twoLegged
    });

    return {
      id: league.id,
      name: league.name,
      twoLegged: league.twoLegged,
      teams: league.teams,
      fixtures: league.fixtures,
      table: league.table
    }
  },
  deleteLeague: async (_: any, args: any, context: any) => {
    const useCase = new DeleteLeagueUseCase(leagueRepository);

    await useCase.execute({
      userId: context.userId,
      leagueId: args.id
    });

    return true;
  }
}