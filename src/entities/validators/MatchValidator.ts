export type MatchTeam = {
  id: number;
  score?: number;
}

export type MatchProps = {
  id?: number;
  leagueId: number;
  roundNumber: number;
  home: MatchTeam;
  away: MatchTeam;
  finished?: boolean;
}

export default class MatchValidator {
  static validate(props: MatchProps) {
    MatchValidator.validateRoundNumber(props.roundNumber);
    MatchValidator.validateTeams(props.home, props.away);
  }

  static validateRoundNumber(roundNumber: number) {
    if (roundNumber <= 0) throw Error("");
  }

  static validateScore(newScore: number) {
    if (newScore < 0) throw new Error("");
  }

  static validateTeams(home: MatchTeam, away: MatchTeam) {
    if (home.id === away.id) throw Error('Teams should not be equal');
    home.score && MatchValidator.validateScore(home.score);
    away.score && MatchValidator.validateScore(away.score);
  }
}