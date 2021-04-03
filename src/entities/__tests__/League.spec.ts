import League from 'entities/League';

it("should create a League", () => {
  const league = League.create({
    id: 1,
    ownerId: 1,
    name: "Brasileirão",
    twoLegged: true
  });

  expect(league.id).toEqual(1);
  expect(league.ownerId).toEqual(1);
  expect(league.name).toEqual("Brasileirão");
  expect(league.twoLegged).toEqual(true);
});

it("should set twoLegged prop as false by default", () => {
  const league = League.create({
    id: 1,
    ownerId: 1,
    name: "Brasileirão"
  });

  expect(league.twoLegged).toEqual(false);
});