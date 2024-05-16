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

  saveGameResults = (team1, team2, results1, results2, countSets, ended = false, Win, Win2, pause1, pause2, pauseCount, pauseCount2, time) => {
    const matchKey = getMatchKey(team1, team2);
    const gameResultsRef = ref(FIREBASE_DB, `matches/${matchKey}/gameResults/${getGameResultsKey(team1, team2, countSets)}`);
    
    set(gameResultsRef, {
      team1: team1,
      team2: team2,
      results1: results1,
      results2: results2,
      set: countSets,
      ended: results1 >= 25 || results2 >= 25,
      win_team1: Win,
      win_team2: Win2,
      pause_team1: pause1,
      pause_team2: pause2,
      pauseCount_team1: pauseCount,
      pauseCount_team2: pauseCount2,
      game_time: time
    });
  };

  deletePreviousGameResults = (team1, team2, countSetsToDelete) => {
    const matchKey = getMatchKey(team1, team2);
    const matchesRef = ref(FIREBASE_DB, `matches/${matchKey}/gameResults`);
    
    for (let i = 2; i < countSetsToDelete; i++) {
        const gameResultsRef = ref(matchesRef, getGameResultsKey(team1, team2, i));
        remove(gameResultsRef)
            .then(() => {
                console.log(`Previous game result ${i} deleted successfully.`);
            })
            .catch((error) => {
                console.error(`Error deleting previous game result ${i}:`, error);
            });
    }
  };

  getMatchKey = (team1, team2, type) => {
    return `${team1}_${team2}_${type}`;
  };

  getGameResultsKey = (team1, team2, countSets) => {
    return `${team1}_${team2}_set${countSets}`;
  };

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