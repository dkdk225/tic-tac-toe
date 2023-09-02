import { useState, useRef } from "react";
import "./App.css";
import { GameFactory } from "../Game"


function App(){
  const [Game, setGame] = useState(null)
  const [id, setId] = useState("")
  return(
    <>
      {!Game &&     
        <div>
          <button onClick={()=>{setGame(()=>GameFactory.generateGame())}}>Generate a table</button>
          <input type="text" value={id} onChange={(e)=>{setId(e.target.value)}} />
          <button onClick={()=>{GameFactory.getGame(id, setGame)}}>Join a table</button>
        </div>
      }
      {Game && <Game></Game>}
    </>
  )
}

export default App;
