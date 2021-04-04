export type UserProps = {
  id?: number;
  username: string;
  password: string;
  email?: string;
  presentationName?: string;
}

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 16;
const PASSWORD_MAX_LENGTH = 120;

export default class UserValidator {
  static validate(props: UserProps): void {
    UserValidator.validateUsername(props.username);
    UserValidator.validateEmail(props.email);
    UserValidator.validatePassword(props.password);
  }

  static validateUsername(username: string): void {
    if (
      username.length > USERNAME_MAX_LENGTH ||
      username.length < USERNAME_MIN_LENGTH
    ) {
      const min = USERNAME_MIN_LENGTH;
      const max = USERNAME_MAX_LENGTH;
      throw new Error(`Username should have between ${min} and ${max} characters`);
    }
  }

  static validateEmail(email?: string): void {
    if (email === undefined) return;
    if (email.length === 0) throw new Error("Email should not be an empty string");
    
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isValidEmail = re.test(email);

    if (!isValidEmail) throw new Error('It should be a valid email');
  }

  static validatePassword(password: string): void {
    if (password.length > PASSWORD_MAX_LENGTH) {
      throw new Error(`Password should have at most ${PASSWORD_MAX_LENGTH} characters.`);
    }
  }
}