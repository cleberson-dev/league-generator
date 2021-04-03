import Match from 'entities/Match';
import db from 'main/database';
import {
  IMatchRepository,
  SavedLeagueId,
  SavedMatchId,
  SavedTeamId,
} from 'common/repositories';

export default class MatchRepository implements IMatchRepository {
  private static _instance: IMatchRepository = new MatchRepository();

  private constructor() {}
  
  static getInstance() {
    return MatchRepository._instance;
  }
  
  async save(newMatch: Match): Promise<void> {
    const table = db('match');

    if (newMatch.id) {
      await table
        .where({ match_id: newMatch.id })
        .first()
        .update(newMatch);
    } else {
      const [id] = await table.insert(newMatch).returning('match_id');
      newMatch.id = id;
    }
  }

  async findOneById(id: SavedMatchId): Promise<Match> {
    const savedMatch = await db('match')
      .where({ match_id: id })
      .first();

    return Match.create({
      id: savedMatch.match_id,
      leagueId: savedMatch.league,
      roundNumber: savedMatch.round_number,
      finished: savedMatch.is_finished,
      home: {
        id: savedMatch.home_team,
        score: savedMatch.home_score,
      },
      away: {
        id: savedMatch.away_team,
        score: savedMatch.away_score,
      },
    });
  }

  async filterByLeague(leagueId: SavedLeagueId): Promise<Match[]> {
    const matches = await db('match').where({ league: leagueId });
    return matches.map((savedMatch) =>
      Match.create({
        id: savedMatch.match_id,
        leagueId: savedMatch.league,
        roundNumber: savedMatch.round_number,
        finished: savedMatch.is_finished,
        home: {
          id: savedMatch.home_team,
          score: savedMatch.home_score,
        },
        away: {
          id: savedMatch.away_team,
          score: savedMatch.away_score,
        },
      }),
    );
  }

  async filterByLeagueTeam(
    leagueId: SavedLeagueId,
    teamId: SavedTeamId,
  ): Promise<Match[]> {
    const matches = await db('match')
      .where({ league: leagueId })
      .andWhere(function () {
        this.where({ home_team: teamId }).orWhere({
          away_team: teamId,
        });
      });
    return matches.map((savedMatch) =>
      Match.create({
        id: savedMatch.match_id,
        leagueId: savedMatch.league,
        roundNumber: savedMatch.round_number,
        home: {
          id: savedMatch.home_team,
          score: savedMatch.home_score,
        },
        away: {
          id: savedMatch.away_team,
          score: savedMatch.away_score,
        },
        finished: savedMatch.finished,
      }),
    );
  }

  async addMatchesToLeague(matches: Match[]): Promise<void> {
    await db.transaction((tr) => {
      db.batchInsert(
        'match',
        matches.map((m) => ({
          round_number: m.roundNumber,
          league: m.leagueId,
          home_team: m.home.id,
          away_team: m.away.id,
        })),
      ).transacting(tr);
    });
  }

  async filterByLeagueAndRound(
    leagueId: SavedLeagueId,
    roundNumber: number,
  ): Promise<Match[]> {
    const roundMatches = await db('match').where({
      league: leagueId,
      round_number: roundNumber,
    });

    return roundMatches.map((match) =>
      Match.create({
        id: match.match_id,
        roundNumber: match.round_number,
        leagueId: match.league,
        finished: match.is_finished,
        home: {
          id: match.home_team,
          score: match.home_score,
        },
        away: {
          id: match.away_team,
          score: match.away_score,
        },
      }),
    );
  }
}
