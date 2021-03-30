import { PropType } from "common/utils";
import Match from "entities/Match";
import Team from "entities/Team";

type Props = {
  matches: Match[];
}

export default class LeagueFixtures {
  private matches: Match[][];

  constructor(props: Props) {
    this.matches = new Array<Array<Match>>();

    props.matches.forEach(match => {
      const roundIdx = match.roundNumber - 1;
      if (!this.matches[roundIdx]) {
        this.matches[roundIdx] = [];
      }

      this.matches[roundIdx].push(match);
    });
  }

  get fixtures() {
    return [...this.matches];
  }

  get rounds() {
    return this.matches.length;
  }

  get matchesPerRound() {
    return this.matches[0].length;
  }

  getRoundMatches(roundNumber: number) {
    if (roundNumber <= 0 || roundNumber > this.rounds) throw new Error('');
    return [...this.matches[roundNumber - 1]];
  }

  getTeamMatches(teamId: NonNullable<PropType<Team, "id">>) {
    const teamMatches: Match[] = [];
    this.matches.forEach(roundMatches => {
      roundMatches.forEach(match => {
        if (match.home.id === teamId || match.away.id === teamId) {
          teamMatches.push(match);
        }
      });
    });
    return teamMatches;
  }
}