import { GameSymbols } from "./dict";

const winConditions = [
  //horizontal patterns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical patterns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //cross patterns
  [0, 4, 8],
  [2, 4, 6],
];

//private static method, implemented using closures 
const calculateTurn = function (table) {
  let turn = 0;
  for (let spot of table) {
    if (spot === GameSymbols.X || spot === GameSymbols.O) turn++;
  }
  return turn; //a number between 0-8
};

//private static method, implemented using closures 
const checkWinner = function (table, turn) {
  /**
   * @summary Checks if the game has finished.
   * @returns An string containing the winner and the pattern of winning.
   */
  //Check for win conditions
  for (let condition of winConditions) {
    const [p1, p2, p3] = condition;
    //if someone wins
    if (table[p1] === table[p2] && table[p1] === table[p3])
      return [table[p1], condition];
  }
  //if no moves left: the game can be 9 turns long at most (8 if 0 based)
  if (turn > 8) return "Tie";
  return [null, null];
};

//private static method, implemented using closures 
const getPlayingSymbol = function (turn) {
  if ( turn % 2 === 0) return GameSymbols.X
  return GameSymbols.O
}

const isSpotUnmarked = (spot) =>{
  if(!(spot === 'x' || spot === 'o'))
    return true
  return false
}

class TableState {
  #table;
  #winner;
  #turn;
  #playingSymbol;
  #playerSymbol;
  #winnerPattern;
  constructor({ table, playerSymbol }) {
    const winner = checkWinner(table, this.#turn);
    this.#table = table;
    this.#turn = calculateTurn(table);
    this.#winner = winner[0];
    this.#playerSymbol = playerSymbol;
    this.#playingSymbol = getPlayingSymbol(this.#turn);
    this.#winnerPattern = winner[1];
  }

  mark(index) {
    if (!this.canPlay()) {
      throw Error("Marking attempt at wrong turn");
    }
    const newTable = this.#table.map((spot, spotIndex) => {
      if (
        spotIndex === index &&
        isSpotUnmarked(spot) &&
        this.#winner === null
      ) {
        return this.#playerSymbol;
      }
      return spot;
    });
    return new TableState({
      table: newTable,
      playerSymbol: this.#playerSymbol,
    });
  }

  getWinner() {
    return this.#winner;
  }
  canPlay() {
    return this.#playerSymbol === this.#playingSymbol;
  }
  copyTable() {
    return this.#table.map((val) => val);
  }
  toString() {
    return this.#table.toString();
  }
  copyWinnerPattern() {
    if (Array.isArray(this.#table))
      return this.#winnerPattern.map((val) => val);
    return null
  }

}
//create a copy so that the original cannot be mutated
const otherWinConditions = winConditions.map((val) => val);


export default TableState
export {otherWinConditions as winConditions}