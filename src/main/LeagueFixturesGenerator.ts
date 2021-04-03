import ILeagueFixturesGenerator, { Props } from "common/ILeagueFixturesGenerator";
import { randomizeArray } from "common/utils";

export default class LeagueFixturesGenerator implements ILeagueFixturesGenerator {  
  generate(props: Props) {
    let pool: number[] = [];
    const teamsIds = randomizeArray(props.teamsIds);
    const matchesPerRound = Math.round(teamsIds.length / 2);
    const roundsPerLeg = teamsIds.length - 1;
    const teamsSize = teamsIds.length
    const lastTeam = teamsIds[teamsSize - 1];
    const fixtures = new Array<{ home: number, away: number, roundNumber: number }>();
    
    // First Round
    for (let i = 0; i < matchesPerRound; i += 1) {
      fixtures.push({ 
        home: teamsIds[i], 
        away: teamsIds[teamsSize - i - 1],
        roundNumber: 1
      });
      pool.push(teamsIds[i]);
      pool.push(teamsIds[teamsSize - i - 1]);
    }

    // Following Rounds
    for (let i = 1; i < roundsPerLeg; i += 1) {
      const lastTeamOfPreviousRound = pool[pool.length - 1];
      const [firstMatchHome, firstMatchAway] = (i + 1) % 2 === 0 ? [lastTeam, lastTeamOfPreviousRound] : [lastTeamOfPreviousRound, lastTeam];
      fixtures.push({
        home: firstMatchHome,
        away: firstMatchAway,
        roundNumber: i + 1
      });
      const newPool: number[] = [];
      newPool.push(firstMatchHome);
      newPool.push(firstMatchAway);
      pool = pool.filter(teamId => teamId !== firstMatchHome && teamId !== firstMatchAway);
      while (pool.length > 0) {
        const away = pool.pop();
        const home = pool.pop();
        fixtures.push({ home: home as number, away: away as number, roundNumber: i + 1 });
        newPool.push(home as number);
        newPool.push(away as number);
      }
      pool = [...newPool];
    }

    return [
      ...fixtures, 
      ...(
        props.twoLegged ? 
          fixtures.map(match => {
            const home = match.away;
            const away = match.home;
            return { home, away, roundNumber: match.roundNumber + 19 }
          }) 
          : []
      )
    ];
  }
}