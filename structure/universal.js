import { Game } from "./game";
import { Team_Universal } from "./teams.universal";

export class _Universal extends Game {
  constructor(team1, team2, type) {
    super(team1, team2, type);
    this.team1 = new Team_Universal(team1);
    this.team2 = new Team_Universal(team2);
    this.type = type;
  }
}

