import { IUserRepository } from "common/repositories";
import Argon2Hasher from "main/Argon2Hasher";
import { UserRepository } from "main/repositories";
import JWTTokenGenerator from "main/JWTTokenGenerator";
import LoginUserUseCase from "useCases/LoginUser";
import RegisterUserUseCase from "useCases/RegisterUser";

const userRepository: IUserRepository = UserRepository.getInstance();

export const mutation = {
  login: async (_: any, args: any) => {
    const { usernameOrEmail, password } = args;

    const useCase = new LoginUserUseCase(
      userRepository,
      new Argon2Hasher(),
      new JWTTokenGenerator()
    );

    const result = await useCase.execute({ usernameOrEmail, password });
      
    return {
      token: result.token,
      user: {
        username: result.user.username
      }
    };
  },
  register: async (_: any, args: any) => {
    const { username, password, password2, email } = args;

    const useCase = new RegisterUserUseCase(
      userRepository,
      new Argon2Hasher(),
      new JWTTokenGenerator()
    );

    const result = await useCase.execute({ username, password, password2, email });

    return {
      token: result.token,
      user: {
        username: result.user.username
      }
    };
  }
}