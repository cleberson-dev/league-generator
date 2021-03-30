type LeagueProps = {
  id?: number;
  name: string;
  twoLegged?: boolean;
  ownerId: number;
}


export default class League {
  id?: number;
  name: string;
  twoLegged?: boolean;
  ownerId: number;

  private constructor(props: LeagueProps) {
    this.id = props.id;
    this.name = props.name;
    this.twoLegged = props.twoLegged || false;
    this.ownerId = props.ownerId;
  }

  static create(props: LeagueProps): League {
    return new League(props);
  }
}