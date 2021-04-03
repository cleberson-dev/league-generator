import { userRepository } from "./mocks";
import RegisterUserUseCase from "useCases/RegisterUser";

let useCase: RegisterUserUseCase;

const hash = jest.fn().mockImplementation(() => 'hashinho');
const matches = jest.fn().mockImplementation(() => true);

const generate = jest.fn().mockImplementation(() => 'tokentoken');
const isValid = jest.fn().mockReturnValue(true);
const decode = jest.fn().mockReturnValue({});

beforeAll(() => {
  useCase = new RegisterUserUseCase(
    userRepository,
    { hash, matches },
    { generate, decode, isValid }
  );
});

afterEach(() => {
  hash.mockClear();
  generate.mockClear();
})



it("should return a token and username", async () => {
  expect.assertions(2);

  const username = 'someuser1';
  const password = 'unsafepassword';
  const email = 'cleberson123@gmail.com';

  const result = await useCase.execute({
    username, password, email,
    password2: password
  });

  expect(result.user.username).toEqual(username);
  expect(result.token).toEqual('tokentoken');
});

it("should throw an error for unmatched passwords", async () => {
  expect.assertions(1);

  const username = 'someuser';
  const password = 'unsafepassword';
  const password2 = 'unsafepassword2';
  const email = 'cleberson@gmail.com';

  await expect(
    useCase.execute({ username, password, email, password2 })
  ).rejects.toThrow();
});

it("should throw an error for passwords less than 8 or greater than 16 characters", async () => {
  expect.assertions(3);

  const invalidPasswords = ['cj', 'seven', 'seventeenpassword'];

  const username = 'fourthuser';
  const email = 'anotherone@gmail.com';

  for (const password of invalidPasswords) {
    await expect(useCase.execute({
      username, email,
      password, password2: password
    })).rejects.toThrow();
  }
});

it("should call the hash function once", async () => {
  expect.assertions(1);

  const username = 'fourthuser';
  const email = 'anotherone@gmail.com';
  const password = 'supersafepass';

  await useCase.execute({
    username, email,
    password, password2: password
  });

  expect(hash.mock.calls).toHaveLength(1);
});

it("should call the generation function once", async () => {
  expect.assertions(1);

  const username = 'fourthuser';
  const email = 'anotherone@gmail.com';
  const password = 'supersafepass';

  await useCase.execute({
    username, email,
    password, password2: password
  });

  expect(generate.mock.calls).toHaveLength(1);
});

it("should pass the password to the hash function", async () => {
  expect.assertions(1);

  const username = 'fourthuser';
  const email = 'anotherone@gmail.com';
  const password = 'supersafepass';

  await useCase.execute({
    username, email,
    password, password2: password
  });

  expect(hash.mock.calls[0][0]).toEqual(password);
});

it("should pass an object with userId property to the generator's 1st argument ", async () => {
  expect.assertions(1);

  const username = 'fourthuser';
  const email = 'anotherone@gmail.com';
  const password = 'supersafepass';

  await useCase.execute({
    username, email,
    password, password2: password
  });

  expect(generate.mock.calls[0][0]).toHaveProperty('userId');
});