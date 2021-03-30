import { PropType } from "common/utils";
import User from "entities/User";
import TeamValidator, { TeamProps } from 'entities/validators/TeamValidator'

export default class Team {
  id?: number;
  name: string;
  code: string;
  ownerId: NonNullable<PropType<User, "id">>;

  private constructor(props: TeamProps) {
    this.id = props.id;
    this.name = props.name;
    this.code = props.code.toUpperCase();
    this.ownerId = props.ownerId;
  }

  static create(props: TeamProps): Team {
    TeamValidator.validate(props);

    return new Team(props);
  }
}