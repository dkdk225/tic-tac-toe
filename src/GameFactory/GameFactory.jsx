import { v4 as uuidv4 } from "uuid";
import GameSymbols from "../Dictionaries/GameSymbols";
import DatabaseMap from "../Dictionaries/DatabaseMap";
import DB from '../db/db'
import createGame from './createGame'
import emptyTable from "../Dictionaries/emptyTable";
import "../App.css";


class GameFactory {
  constructor() {
  }
  getGame(id, setGame) {

    const availableSymbolsDB = new DB(DatabaseMap.AVAILABLE_SYMBOLS, id)
    availableSymbolsDB.read((snapshot)=>{
      const symbol = snapshot.val()[0]
      setGame(() =>
        createGame({
          id: id,
          symbol: symbol,
          tableDB: new DB(DatabaseMap.TABLES, id)
        })
      );
      //change the room symbols to Symbols.NONE
      availableSymbolsDB.write([GameSymbols.NONE])
    })
  }
  generateGame() {
    const id = uuidv4();
    const availableSymbols = [GameSymbols.O, GameSymbols.X];
    const random = Math.floor(Math.random() * 2);
    const availableSymbolsDB = new DB(DatabaseMap.AVAILABLE_SYMBOLS, id)
    const tableDB = new DB('tables', id)
    const Game = createGame({
      id: id,
      symbol: availableSymbols.splice(random, 1)[0], //get the element at random index
      tableDB: tableDB
    });
    availableSymbolsDB.write(availableSymbols)
    tableDB.write(emptyTable)
    return Game;
  }
}



const gameFactory = new GameFactory();
export default gameFactory;
