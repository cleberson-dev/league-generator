import { greet } from '../utils';

it("should lowercase the second name", () => {
  const greeting = greet('WORLD');
  expect(greeting).toEqual('Hello, world!');
});