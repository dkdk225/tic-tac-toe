import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const winConditions2 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(table, turns) {
  
  //if someone wins
  for (let condition of winConditions2) {
    const [p1, p2, p3] = condition;
    console.log(table[p1] ,table[p2], table[p3])
    if (table[p1] == table[p2] && table[p1] == table[p3]) return table[p1];
  }
  //if no moves left (the game can be 9 turns long at most)
  if (turns >= 8) return 'Tie';
  return false;
}
function getMarkedTable(table, index, symbol){
  return table.map((spot, spotIndex)=>{
    if(spotIndex == index){
      return symbol
    }
    return spot
  })
}
const symbols = ['x', 'o']


function App() {
  const [table, setTable] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]); //3x3 game table represented by an array
  const turn = useRef(0);
  const symbol = turn.current % 2 == 0 ? symbols[0]: symbols[1] 
  const winner = checkWinner(table, turn.current)
  console.log(winner)

  return (
    <>
      <span>Current turn: {symbol}</span>
      <div className="table">
        {table.map((e, i) => (
          <button
            className="table__spot"
            onClick={
              ()=>{
                if(!(symbols.some(symbol=>symbol == e) || winner)){
                  console.log(turn.current)
                  setTable(table=>getMarkedTable(table, i, symbol))
                  turn.current = turn.current + 1
                }
              } 
            }
          >
            {e}
          </button>
        ))}
        
        
      </div>
      <span>{winner}</span>
      <button onClick={()=>{setTable([1, 2, 3, 4, 5, 6, 7, 8, 9])}}>Restart Game</button>
    </>
  );
}

export default App;
