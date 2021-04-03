import Match from 'entities/Match';

it("should create an Match", () => {
  const match = Match.create({
    id: 1,
    leagueId: 1,
    roundNumber: 1,
    finished: true,
    home: { id: 1, score: 3 },
    away: { id: 2, score: 1 }
  });

  expect(match.id).toEqual(1);
  expect(match.leagueId).toEqual(1);
  expect(match.roundNumber).toEqual(1);
  expect(match.finished).toEqual(true);
  expect(match.home).toMatchObject({ id: 1, score: 3 });
  expect(match.away).toMatchObject({ id: 2, score: 1 });
})

it('should throw error for negative values and zero as round number', () => {
  const invalidRoundNumbers = [-1, 0];

  invalidRoundNumbers.forEach((roundNumber) => {
    expect(() =>
      Match.create({
        leagueId: 1,
        home: { id: 1, score: 1 },
        away: { id: 2, score: 1 },
        roundNumber,
      }),
    ).toThrow();
  });
});

it('should throw error for negative values as scores', () => {
  expect(() =>
    Match.create({
      leagueId: 1,
      home: { id: 1, score: -1 },
      away: { id: 2, score: -2 },
      roundNumber: 1,
    }),
  ).toThrow();
});

it('should throw error if home and away ids are equal', () => {
  expect(() =>
    Match.create({
      leagueId: 1,
      home: { id: 1, score: 0 },
      away: { id: 1, score: 1 },
      roundNumber: 1,
    }),
  ).toThrow();
});

it('should not be finished by default', () => {
  const match = Match.create({
    leagueId: 1,
    roundNumber: 1,
    home: { id: 1 },
    away: { id: 2 },
  });

  expect(match.finished).toEqual(false);
});

it('should have scores equal to 0 by default', () => {
  const match = Match.create({
    leagueId: 1,
    roundNumber: 1,
    home: { id: 1 },
    away: { id: 2 },
  });

  expect(match.home.score).toEqual(0);
  expect(match.away.score).toEqual(0);
});

it('should floor floating scores to integer ones', () => {
  const match = Match.create({
    leagueId: 1,
    roundNumber: 1,
    home: { id: 1, score: 2.5 },
    away: { id: 2, score: 3.2 },
  });

  expect(match.home.score).toEqual(2);
  expect(match.away.score).toEqual(3);
});

describe('.homeScore and .awayScore set properties', () => {
  let match: Match | undefined;

  beforeAll(() => {
    match = Match.create({
      leagueId: 1,
      roundNumber: 1,
      home: { id: 1 },
      away: { id: 2 },
    });
  });

  it('should not accept negative values', () => {
    expect(() => {
      (match as Match).homeScore = -1;
    }).toThrow();
    expect(() => {
      (match as Match).awayScore = -1;
    }).toThrow();
  });

  it('should floor floating scores', () => {
    (match as Match).homeScore = 1.22;  
    (match as Match).awayScore = 2.33;

    expect(match?.home.score).toEqual(1);
    expect(match?.away.score).toEqual(2);
  });
});
