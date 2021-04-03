import LoginUserUseCase from 'useCases/LoginUser';
import { userRepository } from './mocks';

let useCase: LoginUserUseCase;

const hash = jest.fn().mockReturnValue('hashinho');
const matches = jest.fn().mockReturnValue(true);

const generate = jest.fn().mockReturnValue('tokentoken');
const isValid = jest.fn().mockReturnValue(true);
const decode = jest.fn().mockReturnValue({});

beforeAll(() => {
  useCase = new LoginUserUseCase(
    userRepository,
    { hash, matches },
    { generate, isValid, decode },
  );
});

afterEach(() => {
  matches.mockClear();
  generate.mockClear();
});

it('should login successfully', async () => {
  expect.assertions(1);

  const result = await useCase.execute({
    usernameOrEmail: 'clebersondev',
    password: 'safepasss',
  });

  expect(result.token).toEqual('tokentoken');
});

it('should throw an error for unmatched passwords', async () => {
  expect.assertions(1);

  matches.mockReturnValue(false);

  await expect(useCase.execute({
    usernameOrEmail: 'clebersondev',
    password: 'anypassword',
  })).rejects.toThrow();
});

it('should pass the provided password to the matches first argument', async () => {
  expect.assertions(1);
  matches.mockReturnValue(true);

  const password = 'anypassword'; 
  await useCase.execute({
    usernameOrEmail: 'clebersondev',
    password,
  });

  expect(matches.mock.calls[0][0]).toEqual(password);
});

it("should call the matches function once", async () => {
  expect.assertions(1);

  await useCase.execute({
    usernameOrEmail: 'clebersondev',
    password: 'thispassword'
  });

  expect(matches.mock.calls).toHaveLength(1);
});

it("should call the generate function once", async () => {
  expect.assertions(1);

  await useCase.execute({
    usernameOrEmail: 'clebersondev',
    password: 'thispassword'
  });

  expect(generate.mock.calls).toHaveLength(1);
});