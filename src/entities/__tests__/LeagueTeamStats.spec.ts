import LeagueTeamStats from 'entities/LeagueTeamStats';

it("should not receive negative numbers as parameter", () => {  
  expect(() => LeagueTeamStats.create({
    teamId: 1,
    wins: -1, draws: 0, losses: 1,
    goalsScored: 0, goalsConceded: 0
  })).toThrow();
});

it("should have 10 points for 3W-1D-2L", () => {
  const stats = LeagueTeamStats.create({
    teamId: 1,
    goalsScored: 0, goalsConceded: 0,
    wins: 3, draws: 1, losses: 2
  });

  expect(stats.points).toEqual(10);
});

it("should have 6 matches for 3W-1D-2L", () => {
  const stats = LeagueTeamStats.create({
    teamId: 1,
    goalsScored: 0, goalsConceded: 0,
    wins: 3, draws: 1, losses: 2
  });

  expect(stats.matches).toEqual(6);
});

it("should have 55.5% for 3W-1D-2L", () => {
  const stats = LeagueTeamStats.create({
    teamId: 1,
    goalsScored: 0, goalsConceded: 0,
    wins: 3, draws: 1, losses: 2,
  });

  expect(stats.percentage).toBeCloseTo(0.555);
});

it("should always have percentage less than or equal to 1", () => {
  const stats = LeagueTeamStats.create({
    teamId: 1,
    goalsScored: 0, goalsConceded: 0,
    wins: Math.round(Math.random() * 10), 
    draws: Math.round(Math.random() * 10), 
    losses: Math.round(Math.random() * 10)
  });

  expect(stats.percentage).toBeLessThanOrEqual(1);
});

it("should have a goal diff of +12 for 18 scored and 6 conceded", () => {
  const stats = LeagueTeamStats.create({
    teamId: 1,
    wins: 0, draws: 0, losses: 0,
    goalsScored: 18, goalsConceded: 6,
  });

  expect(stats.goalsDiff).toEqual(12);
});

// Object.entries(params).forEach(([field]) => {
//   expect(() => {
//     LeagueTeamStats.create({ teamId: 1, ...params, [field]: -1 })  
//   }).toThrow();