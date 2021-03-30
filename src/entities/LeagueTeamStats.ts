import LeagueTeamStatsValidator, { LeagueTeamStatsProps } from "entities/validators/LeagueTeamStatsValidator";

const POINTS_PER_WIN = 3;
const POINTS_PER_DRAW = 1;
const POINTS_PER_LOSS = 0;

export default class LeagueTeamStats {
  teamId: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;

  private constructor(props: LeagueTeamStatsProps) {
    this.teamId = props.teamId;
    this.wins = props.wins;
    this.draws = props.draws;
    this.losses = props.losses;
    this.goalsScored = props.goalsScored;
    this.goalsConceded = props.goalsConceded;
  }

  static create(props: LeagueTeamStatsProps): LeagueTeamStats {
    LeagueTeamStatsValidator.validate(props);

    return new LeagueTeamStats(props);
  }

  get matches() {
    return this.wins + this.draws + this.losses; 
  }

  get points() {
    return (
      this.wins * POINTS_PER_WIN 
      + this.draws * POINTS_PER_DRAW 
      + this.losses * POINTS_PER_LOSS
    );
  }

  get percentage() {
    return this.points / (this.matches * POINTS_PER_WIN) ;
  }

  get goalsDiff() {
    return this.goalsScored - this.goalsConceded;
  }
}