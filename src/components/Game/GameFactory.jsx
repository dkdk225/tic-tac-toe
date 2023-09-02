import { v4 as uuidv4 } from "uuid";
import createGame from './createGame'
import { DB, DatabaseMap} from "../../db"
import { EmptyTable, GameSymbols } from "../../game-table";

class GameFactory {
  constructor() {
  }
  static getGame(id, setGame) {

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
  static generateGame() {
    const id = uuidv4();
    const availableSymbols = [GameSymbols.O, GameSymbols.X];
    const random = Math.floor(Math.random() * 2);
    const availableSymbolsDB = new DB(DatabaseMap.AVAILABLE_SYMBOLS, id)
    const tableDB = new DB(DatabaseMap.TABLES, id)
    const Game = createGame({
      id: id,
      symbol: availableSymbols.splice(random, 1)[0], //get the element at random index
      tableDB: tableDB
    });
    availableSymbolsDB.write(availableSymbols)
    tableDB.write(EmptyTable)
    return Game;
  }
}



export default GameFactory;
