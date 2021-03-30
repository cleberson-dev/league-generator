import LeagueTeamStats from "entities/LeagueTeamStats";
import Match from "entities/Match";

export type Props = {
  matches: Match[];
};

export default interface ITableCalculator {
  calculate(props: Props): LeagueTeamStats[];
}

