import { useState, useContext, createContext } from "react";
import "./common.css"
import "./App.css";
import { GameFactory } from "../Game"
import { EventBus } from "../../event-bus"
import { Popup } from "../Popup"
const EventBusContext = createContext(new EventBus())



function App(){
  const bus = useContext(EventBusContext)
  console.log(bus)
  const [Game, setGame] = useState(null)
  const [id, setId] = useState("")
  return(
    <div className="app">
      {!Game &&     
        <div className="game-menu absolute center ">
          <button className="button game-menu__button" onClick={()=>{setGame(()=>GameFactory.generateGame())}}>Generate a table</button>

          <button className="button game-menu__button" onClick={()=>{bus.publish('open join table')}}>Join a table</button>
          <Popup name="join table" className="fixed center join-popup">
            <h3 className="h3 center-text">Enter room Id</h3>
            <input className="input" type="text" value={id} onChange={(e)=>{setId(e.target.value)}} />
            <button className="button join-popup__button absolute horizontal-center" onClick={()=>{GameFactory.getGame(id, setGame)}}>Join table</button>
          </Popup>
        </div>
      }
      {Game && <Game></Game>}
    </div>
  )
}
export {EventBusContext}
export default App;
