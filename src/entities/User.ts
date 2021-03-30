import UserValidator, { UserProps } from "entities/validators/UserValidator";

export default class User {
  id?: number;
  username: string;
  password: string;
  email?: string;
  presentationName?: string;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.username = props.username;
    this.password = props.password;
    this.email = props.email;
    this.presentationName = props.presentationName;
  }

  static create(props: User): User {
    UserValidator.validate(props);

    return new User(props);
  }
}