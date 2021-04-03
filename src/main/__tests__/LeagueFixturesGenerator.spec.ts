import { generateTeamsIds } from "common/utils";
import LeagueFixturesGenerator from "main/LeagueFixturesGenerator";

let teamsIds: number[];
let generator: LeagueFixturesGenerator;

let oneLeggedFixtures: ReturnType<typeof generator.generate>;
let twoLeggedFixtures: ReturnType<typeof generator.generate>;

beforeAll(() => {
  teamsIds = generateTeamsIds(20);
  generator = new LeagueFixturesGenerator();
  oneLeggedFixtures = generator.generate({ teamsIds, twoLegged: false });
  twoLeggedFixtures = generator.generate({ teamsIds, twoLegged: true });
});

it("should create 190 matches for one-legged leagues", () => {
  expect(oneLeggedFixtures).toHaveLength(190);
});

it("should create 380 matches for two-legged leagues", () => {
  expect(twoLeggedFixtures).toHaveLength(380);
});

it("should not have same team as home and away in the same match", () => {
  oneLeggedFixtures.forEach(match => {
    expect(match.home).not.toEqual(match.away);
  });
});

it("should not have 19 matches for every team", () => {
  teamsIds.forEach(team => {
    expect(
      oneLeggedFixtures
        .filter(match => match.home === team || match.away === team)
    ).toHaveLength(19);
  });
});

it("should have 10 matches for a round", () => {
  const roundNumber = 2;
  const roundMatches = oneLeggedFixtures.filter(match => match.roundNumber === roundNumber);
  
  expect(roundMatches).toHaveLength(10);
});

it("should have correct round number in second leg matches", () => {
  const secondLegMatch = twoLeggedFixtures
    .filter(match => match.roundNumber === 20)

  expect(secondLegMatch).toHaveLength(10);
});

it("should have home and away swapped for two legged leagues", () => {
  const firstLegMatch = twoLeggedFixtures[0];
  const secondLegMatch = twoLeggedFixtures
    .filter(match => match.roundNumber === 20)
    .find(match => {
      const team = firstLegMatch.home;
      return match.home === team || match.away === team;
    });

  expect(secondLegMatch?.home).toEqual(firstLegMatch.away);
  expect(secondLegMatch?.away).toEqual(firstLegMatch.home);
});