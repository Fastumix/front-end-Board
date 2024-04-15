import { Team } from "./teams";

export class Game {
  constructor(team1Name, team2Name) {
    this.team1 = new Team(team1Name);
    this.team2 = new Team(team2Name);
    this.sets = [];
    this.ended = false;
  }

  addSetResult(team1Score, team2Score) {
    this.sets.push({ team1Score, team2Score });
  }

  setEnded(ended) {
    this.ended = ended;
  }

  getEnded() {
    return this.ended;
  }

  getSets() {
    return this.sets;
  }
}