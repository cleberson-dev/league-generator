import LeagueFixtures from "entities/LeagueFixtures";
import Match from "entities/Match";

let fixtures: LeagueFixtures;

const matches: Match[] = [];


beforeAll(() => {
  const rounds = 19;
  const matchesPerRound = 10;
  
  for (let i = 1; i <= rounds; i += 1) {
    for (let j = 1; j <= matchesPerRound; j += 1) {
      matches.push(Match.create({
        id: 1, leagueId: 1, roundNumber: i,
        home: { id: 1, score: 0 }, away: { id: 2, score: 0 }
      }));
    }
  }
  fixtures = new LeagueFixtures({ matches });
});

it("should have 19 rounds", () => {
  expect(fixtures.rounds).toEqual(19);
});

it("should have 10 matches per round", () => {
  expect(fixtures.matchesPerRound).toEqual(10);
});

it("should return a copy of matches", () => {
  const f1 = fixtures.fixtures;
  const f2 = fixtures.fixtures;

  f1.push([]);

  expect(f1.length).not.toEqual(f2.length);
});

it("getRoundMatches(): should throw an error for negative passed round numbers", () => {
  expect(() => {
    fixtures.getRoundMatches(-1)
  }).toThrow();
});
it("getRoundMatches(): should throw an error for negative passed round numbers", () => {
  expect(() => {
    fixtures.getRoundMatches(20)
  }).toThrow();
});

it("getRoundMatches(): should have 10 matches in 1 round", () => {
  const roundMatches = fixtures.getRoundMatches(15);

  expect(roundMatches).toHaveLength(10);
});

it("getRoundMatches(): should all have the same round number", () => {
  const roundNumber = 15;
  
  fixtures
    .getRoundMatches(roundNumber)
    .forEach(match => expect(match.roundNumber).toEqual(roundNumber));
});

it("getTeamMatches(): should have correct team matches length", () => {
  const teamMatches = fixtures.getTeamMatches(2);

  expect(teamMatches).toHaveLength(190);
});

it("getTeamMatches(): should not have duplicate round numbers", () => {
  const teamMatches = fixtures.getTeamMatches(1);
  const roundNumbers = teamMatches.map(match => match.roundNumber).sort((a, b) => a - b);

  expect(new Set(roundNumbers).size).toEqual(19);
  expect(roundNumbers[0]).toEqual(1);
  expect(roundNumbers.slice(-1)[0]).toEqual(19);
});

