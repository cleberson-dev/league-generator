import { PropType } from "common/utils";
import User from "entities/User";

export type TeamProps = {
  id?: number;
  name: string;
  code: string;
  ownerId: NonNullable<PropType<User, "id">>;
}

export default class TeamValidator {
  static validate(props: TeamProps) {
    TeamValidator.validateCode(props.code);
  }

  static validateCode(code: string) {
    if (code.length !== 3) throw new Error('Team code should have 3 characters');
  }
}