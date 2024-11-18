export class Team {

    constructor(name, results, win, pause, pauseCount){
      this.name = name;
      this.result = results;
      this.win = win;
      this.pause = pause;
      this.pauseCount = pauseCount;
    }
  
  
    getGameResults() {
      return this.gameResults;
    }
}