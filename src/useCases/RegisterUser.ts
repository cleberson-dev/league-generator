import User from "entities/User";
import { IUserRepository } from "common/repositories";
import IHasher from "common/IHasher";
import ITokenGenerator from "common/ITokenGenerator";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 16;

export type Params = {
  username: string;
  password: string;
  password2: string;
  email?: string;
}

export type Result = {
  token: string;
  user: { username: string };
};


export default class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hasher: IHasher,
    private tokenizer: ITokenGenerator
  ) {}

  async execute(params: Params): Promise<Result> {
    RegisterUserValidator.validate(params);

    const hashedPassword = await this.hasher.hash(params.password);

    const user = User.create({
      username: params.username,
      password: hashedPassword,
      email: params.email
    });

    await this.userRepository.save(user);

    const token = await this.tokenizer.generate({ userId: user.id });

    return {
      token,
      user: { username: user.username }
    };
  }
}

class RegisterUserValidator {
  static validate(request: Params) {
    const { password, password2 } = request;

    if (password !== password2) {
      throw new Error('The passwords should be the same');
    }

    if (
      password.length < PASSWORD_MIN_LENGTH ||
      password.length > PASSWORD_MAX_LENGTH
    ) {
      const min = PASSWORD_MIN_LENGTH;
      const max = PASSWORD_MAX_LENGTH;
      throw new Error(`Password should have between ${min} and ${max} characters`);
    }
  } 
}