import { useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAreWjWUJefpXsDvRTEt6-_Kl_CIGZBgak",
  authDomain: "tic-tac-toe-845c4.firebaseapp.com",
  databaseURL:
    "https://tic-tac-toe-845c4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tic-tac-toe-845c4",
  storageBucket: "tic-tac-toe-845c4.appspot.com",
  messagingSenderId: "1008418777316",
  appId: "1:1008418777316:web:dee22be8c0cc41f1f624f1",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const tableId = 1; //TODO: get table id dynamicly when generating a game room

//DELETE
function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase(app);
  console.log(db);
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
//====================

function writeGameTable(table, id) {
  set(ref(database, "tables/" + tableId), table);
}

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

function checkWinner(table, turns) {
  //if someone wins
  for (let condition of winConditions) {
    const [p1, p2, p3] = condition;
    console.log(table[p1], table[p2], table[p3]);
    if (table[p1] == table[p2] && table[p1] == table[p3]) return table[p1];
  }
  //if no moves left: the game can be 9 turns long at most (8 if 0 based)
  if (turns >= 8) return "Tie";
  return false;
}
function getMarkedTable(table, index, symbol) {
  return table.map((spot, spotIndex) => {
    if (spotIndex == index) {
      return symbol;
    }
    return spot;
  });
}
const symbols = ["x", "o"];

function Game() {
  const [table, setTable] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]); //3x3 game table represented by an array
  const turn = useRef(0);
  const symbol = turn.current % 2 == 0 ? symbols[0] : symbols[1];
  const winner = checkWinner(table, turn.current);
  writeGameTable(table, tableId)
  return (
    <>
      <span>Current turn: {symbol}</span>
      <div className="table">
        {table.map((e, i) => (
          <button
            key={i}
            className="table__spot"
            onClick={() => {
              if (!(symbols.some((symbol) => symbol == e) || winner)) {
                console.log(turn.current);
                setTable((table) => getMarkedTable(table, i, symbol));
                turn.current = turn.current + 1;
              }
            }}
          >
            {e}
          </button>
        ))}
      </div>
      <span>{winner}</span>
      <button
        onClick={() => {
          setTable([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }}
      >
        Ask for a replay
      </button>
    </>
  );
}

export default Game;
