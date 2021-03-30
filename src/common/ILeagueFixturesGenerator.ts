import Team from "entities/Team";
import { PropType } from "common/utils";

export type Props = {
  teamsIds: NonNullable<PropType<Team, "id">>[];
  twoLegged: boolean;
}

export type Result = { home: number; away: number; roundNumber: number }[];

export default interface ILeagueFixturesGenerator {  
  generate(props: Props): Result;
}

