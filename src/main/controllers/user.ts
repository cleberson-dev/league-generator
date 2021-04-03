import { Request, Response } from "express";
import Argon2Hasher from "main/Argon2Hasher";
import { UserRepository } from "main/database";
import JWTTokenGenerator from "main/JWTTokenGenerator";
import LoginUserUseCase from "useCases/LoginUser";
import RegisterUserUseCase from "useCases/RegisterUser";

const userRepository = UserRepository.getInstance();
const hasher = new Argon2Hasher();
const tokenizer = new JWTTokenGenerator();

export default class UserController {
  static async login(req: Request, res: Response) {
    const useCase = new LoginUserUseCase(
      userRepository, hasher, tokenizer
    );
      
    const { usernameOrEmail, password } = req.body;
    const result = await useCase.execute({
      usernameOrEmail, password
    });
  
    return res.status(200).send(result);
  }

  static async register(req: Request, res: Response) {
    const useCase = new RegisterUserUseCase(userRepository, hasher, tokenizer);
  
    const { username, password, password2, email } = req.body;
    const result = await useCase.execute({
      username, password, password2, email
    });
  
    return res.status(200).send(result);
  }
}
