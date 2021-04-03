import ITableCalculator from "common/ITableCalculator";
import LeagueTeamStats from "entities/LeagueTeamStats";

import { Props } from 'common/ITableCalculator';

export default class TableCalculator implements ITableCalculator {
  calculate(props: Props): LeagueTeamStats[] {
    const table: LeagueTeamStats[] = [];
    
    props.matches.forEach(match => {
      let homeTeamStats: LeagueTeamStats | undefined;
      let awayTeamStats: LeagueTeamStats | undefined;
      
      homeTeamStats = table.find(team => team.teamId === match.home.id);
      awayTeamStats = table.find(team => team.teamId === match.away.id);

      if (!homeTeamStats) {
        homeTeamStats = LeagueTeamStats.create({ 
          teamId: match.home.id,
          wins: 0, draws: 0, losses: 0, 
          goalsScored: 0, goalsConceded: 0 
        });
        table.push(homeTeamStats);
      }

      if (!awayTeamStats) {
        awayTeamStats = LeagueTeamStats.create({ 
          teamId: match.away.id,
          wins: 0, draws: 0, losses: 0, 
          goalsScored: 0, goalsConceded: 0 
        });
        table.push(awayTeamStats);
      }


      if (!match.finished) return;

      if ((match.home.score as number) > (match.away.score as number)) {
        homeTeamStats.wins += 1;
        awayTeamStats.losses += 1;
      } else if ((match.home.score as number) === (match.away.score as number)) {
        homeTeamStats.draws += 1;
        awayTeamStats.draws += 1;
      } else {
        homeTeamStats.losses += 1;
        awayTeamStats.wins += 1;
      }

      homeTeamStats.goalsScored += match.home.score as number;
      homeTeamStats.goalsConceded += match.away.score as number;

      awayTeamStats.goalsScored += match.away.score as number;
      awayTeamStats.goalsConceded += match.home.score as number;
    });

    return table;
  }
}