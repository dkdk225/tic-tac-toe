import { useState, useRef } from "react";
import "./App.css";
import gameFactory from "./GameFactory/GameFactory.jsx"


function App(){
  const [Game, setGame] = useState(null)
  const [id, setId] = useState(0)
  return(
    <>
      {!Game &&     
        <div>
          <button onClick={()=>{setGame(()=>gameFactory.generateGame())}}>Generate a table</button>
          <input type="text" value={id} onChange={(e)=>{setId(e.target.value)}} />
          <button onClick={()=>{gameFactory.getGame(id, setGame)}}>Join a table</button>
        </div>
      }
      {Game && <Game></Game>}
    </>
  )
}

export default App;
