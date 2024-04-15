export class Team {
    constructor(name) {
      this.name = name;
    }
  
    addGameResult(team1, team2, results1, results2, countSets, ended, Win, Win2, pause1, pause2, pauseCount, pauseCount2) {
      if (team1 === this.name || team2 === this.name) {
        this.gameResults.push({
          team1: team1,
          team2: team2,
          results1: results1,
          results2: results2,
          set: countSets,
          ended: ended,
          win_team1: Win,
          win_team2: Win2,
          pause_team1: pause1,
          pause_team2: pause2,
          pauseCount_team1: pauseCount,
          pauseCount_team2: pauseCount2
        });
      } else {
        console.error("Одна з команд не відповідає цій команді.");
      }
    }
  
    getGameResults() {
      return this.gameResults;
    }
}