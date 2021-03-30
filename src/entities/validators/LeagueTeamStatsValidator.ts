export type LeagueTeamStatsProps = {
  teamId: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
}

export default class LeagueTeamStatsValidator {
  static validate(props: LeagueTeamStatsProps) {
    LeagueTeamStatsValidator.checkForNegativeNumbers(props);
  }

  static checkForNegativeNumbers(props: Omit<LeagueTeamStatsProps, "teamId">) {
    const values = Object
      .entries(props)
      .map(([_,val]) => val); 
    if (values.some(val => val < 0)) throw Error('They should be positive numbers');
  }
}