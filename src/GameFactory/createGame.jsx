import emptyTable from "../Dictionaries/emptyTable";
import GameSymbols from "../Dictionaries/GameSymbols";
import { useState } from "react";
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = function (table, turns) {
  //if someone wins
  for (let condition of winConditions) {
    const [p1, p2, p3] = condition;
    if (table[p1] == table[p2] && table[p1] == table[p3]) return table[p1];
  }
  //if no moves left: the game can be 9 turns long at most (8 if 0 based)
  if (turns > 8) return "Tie";
  return false;
};

const getMarkedTable = function (table, index, symbol) {
  return table.map((spot, spotIndex) => {
    if (spotIndex == index) {
      return symbol;
    }
    return spot;
  });
};

const calculateGameTurn = function (table) {
  let turn = 0;
  for (let spot of table) {
    if (spot === GameSymbols.X || spot === GameSymbols.O) turn++;
  }
  return turn; //a number between 0-8
};
const hasTurn = function (turn, symbol) {
  const isTurnEven = turn % 2 == 0;
  const isTurnOdd = turn % 2 == 1;
  if (
    (isTurnEven && symbol === GameSymbols.X) ||
    (isTurnOdd && symbol === GameSymbols.O)
  )
    return true;
  return null; // returns null because null gets ignored in callback while false causes an error
};

const generateMark = function (symbol) {
  //return a mark: a component to represent the symbol in gui
  return symbol === GameSymbols.O ? "o" : symbol === GameSymbols.X ? "x" : " ";
};

const canBeMarked = function(hasTurn, winner, mark){
  if(
    hasTurn &&
    (mark != GameSymbols.X && mark != GameSymbols.O) &&
    (winner == false)
  )
    return true
  
  return null
}


const createGame = function ({ id, symbol, tableDB }) {
  return function Game(props) {
    const [table, setTable] = useState(emptyTable); //3x3 game table represented by an array
    const turn = calculateGameTurn(table);
    const winner = checkWinner(table, turn);
    tableDB.listen((snapshot)=>{
      const data = snapshot.val();
      //update the table if they're not the same
      if (data.toString() != table.toString()) {
        setTable(() => data);
      }
    }) 

    return (
      <>
        <div>Table Id: {id}</div>
        <span>Your Symbol: {generateMark(symbol)}</span>
        <div className="table">
          {table.map((e, i) => (
            <button
              key={i}
              className="table__spot"
              disabled={!hasTurn(turn, symbol)}
              onClick={
                // To be able to click it needs to be the players turn
                // And the spot shouldnt be marked
                // And the game should have no winners
                canBeMarked(hasTurn(turn, symbol), winner, e) &&
                function () {
                  setTable((table) => {
                    const markedTable = getMarkedTable(table, i, symbol);
                    tableDB.write(markedTable)
                    return markedTable;
                  });
                }
              }
            >
              {generateMark(e)}
            </button>
          ))}
        </div>
        {winner &&
          <div>The winner is: {winner}</div>}
        <button
          onClick={() => {
            setTable(() => {

              const table = emptyTable;
              tableDB.write(table);
              return table;
            });
          }}
        >
          Ask for a replay
        </button>
      </>
    );
  };
};

export default createGame