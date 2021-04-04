import User from 'entities/User';
import db from 'main/database';
import { IUserRepository, SavedUserId } from 'common/repositories';

export default class UserRepository implements IUserRepository {
  private static _instance: IUserRepository = new UserRepository();

  private constructor() {}
  
  static getInstance() {
    return UserRepository._instance;
  }
  
  async findOneByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User> {
    const savedUser = await db('user_account')
      .where({ username: usernameOrEmail })
      .orWhere({ email: usernameOrEmail })
      .first();

    return User.create({
      id: savedUser.user_id,
      username: savedUser.username,
      password: savedUser.password,
      email: savedUser.email,
      presentationName: savedUser.presentation_name,
    });
  }

  async findAll(): Promise<User[]> {
    const savedUsers = await db('user_account');
    const users = savedUsers.map<User>((savedUser) =>
      User.create({
        id: savedUser.user_id,
        username: savedUser.username,
        password: savedUser.password,
        email: savedUser.email,
        presentationName: savedUser.presentation_name,
      }),
    );

    return users;
  }

  async save(newUser: User): Promise<void> {
    const table = db('user_account');

    const payload = {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      presentation_name: newUser.presentationName
    };

    if (newUser.id) {
      await table
        .where({ user_id: newUser.id })
        .first()
        .update(payload);
    } else {
      const [id] = await table
        .insert(payload)
        .returning('user_id');
      newUser.id = id;
    }
  }

  async findOneById(id: SavedUserId): Promise<User> {
    const table = db('user_account');
    const savedUser = await table
      .where({
        user_id: id,
      })
      .first();

    if (!savedUser) throw Error('User not found');

    return User.create({
      id: savedUser.user_id,
      username: savedUser.username,
      password: savedUser.password,
      email: savedUser.email,
      presentationName: savedUser.presentation_name,
    });
  }
}
