import { PropType } from "common/utils";
import League from "entities/League";
import MatchValidator, { MatchTeam, MatchProps } from "./validators/MatchValidator";


export default class Match {
  id?: number;
  leagueId: NonNullable<PropType<League, "id">>;
  roundNumber: number;
  home: MatchTeam;
  away: MatchTeam;
  finished?: boolean;

  private constructor(props: MatchProps) {
    this.id = props.id;
    this.leagueId = props.leagueId;
    this.roundNumber = props.roundNumber;
    this.home = {
      id: props.home.id,
      score: props.home.score ? Math.floor(props.home.score) : 0 
    };
    this.away = {
      id: props.away.id,
      score: props.away.score ? Math.floor(props.away.score) : 0 
    };
    this.finished = props.finished || false;
  }

  static create(props: MatchProps): Match {
    MatchValidator.validate(props);
    
    return new Match(props);
  }

  set homeScore(newScore: number) {
    MatchValidator.validateScore(newScore);

    this.home.score = Math.floor(newScore);
  }

  set awayScore(newScore: number) {
    MatchValidator.validateScore(newScore);

    this.away.score = Math.floor(newScore);
  }
}