import { Team } from './teams';
import { Game } from './game';

export class aggregateTeamGame {
  constructor(team1Name = '', team2Name = '') {
    this.team1 = new Team(team1Name);
    this.team2 = new Team(team2Name);
    this.game = new Game(this.team1.name, this.team2.name, 0);
  }

  setTeam1Info(name, gameResults) {
    this.team1.name = name;
    this.team1.gameResults = gameResults;
  }

  setTeam2Info(name, gameResults) {
    this.team2.name = name;
    this.team2.gameResults = gameResults;
  }

  setGameInfo(countSets) {
    this.game.countSets = countSets;
  }

  addGameResultToTeam(teamNumber, team1, team2, results1, results2, countSets, ended, Win, Win2, pause1, pause2, pauseCount, pauseCount2) {
    if (teamNumber === 1) {
      this.team1.addGameResult(team1, team2, results1, results2, countSets, ended, Win, Win2, pause1, pause2, pauseCount, pauseCount2);
    } else if (teamNumber === 2) {
      this.team2.addGameResult(team1, team2, results1, results2, countSets, ended, Win, Win2, pause1, pause2, pauseCount, pauseCount2);
    } else {
      console.error("Невірний номер команди.");
    }
  }

  getTeamGameResults(teamNumber) {
    if (teamNumber === 1) {
      return this.team1.getGameResults();
    } else if (teamNumber === 2) {
      return this.team2.getGameResults();
    } else {
      console.error("Невірний номер команди.");
      return [];
    }
  }
}