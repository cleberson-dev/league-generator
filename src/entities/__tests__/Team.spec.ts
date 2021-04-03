import Team from "entities/Team";

it("should uppercase team code from 'fla' to 'FLA'", () => {
  const mengao = Team.create({
    name: "Flamengo",
    code: "fla",
    ownerId: 1
  });

  expect(mengao.code).toEqual("FLA");
});

it("should create a Team called Flamengo with: code FLA and ownerId 1", () => {      
  
  const mengao = Team.create({
    name: "Flamengo",
    ownerId: 1,
    code: "FLA"
  });

  expect(mengao.name).toEqual("Flamengo");
  expect(mengao.code).toEqual("FLA");
  expect(mengao.ownerId).toEqual(1);
});

it("should throw an error for a code with a length not equal to 3", () => {
  const invalidCodes = ["", "a", "ab", "abcd", "abcde"];  
  
  invalidCodes.forEach(code => {
    expect(() => {
      Team.create({
        name: "Flamengo",
        code,
        ownerId: 1
      })
    }).toThrow('Team code should have 3 characters')
  });
});

