import { useState, useContext, createContext } from "react";
import "./App.css";
import { GameFactory } from "../Game"
import { EventBus } from "../../event-bus"
const EventBusContext = createContext(new EventBus())



function App(){
  const bus = useContext(EventBusContext)
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
