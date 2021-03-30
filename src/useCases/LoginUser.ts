import { IUserRepository } from "common/repositories";
import IHasher from "common/IHasher";
import ITokenGenerator from "common/ITokenGenerator";

export type Params = {
  usernameOrEmail: string;
  password: string;
}

export type Result = {
  token: string;
  user: {
    username: string;
  }
}

export default class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hasher: IHasher,
    private tokenizer: ITokenGenerator
  ) { }
  
  async execute(params: Params): Promise<Result> {
    const user = await this.userRepository.findOneByUsernameOrEmail(params.usernameOrEmail);

    const hashedPassword = user.password;
    const isSamePassword = this.hasher.matches(params.password, hashedPassword);
    if (!isSamePassword) throw new Error("Invalid credentials");

    const token = await this.tokenizer.generate({ userId: user.id });

    return {
      token,
      user: { username: user.username }
    };
  }
}