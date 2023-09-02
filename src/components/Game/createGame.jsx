import { TableState, EmptyTable, GameSymbols } from "../../game-table";
import { useState } from "react";
import "./game.css"

const generateMark = function (symbol) {
  //return a mark: a component to represent the symbol in gui
  return symbol === GameSymbols.O ? "o" : symbol === GameSymbols.X ? "x" : " ";
};

const copyToClipboard = async (value) =>{
  try {
    await navigator.clipboard.writeText(value);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}




const createGame = function ({ id, symbol, tableDB }) {
  return function (props) {
    const [table, setTable] = useState(new TableState({table:EmptyTable, playerSymbol:symbol})); 
    const winner = table.getWinner()
    tableDB.listen((snapshot)=>{
      const tableData = snapshot.val();
      //update the table if it has changed
      if (tableData.toString() !== table.toString()) {
        setTable(() => new TableState({table:tableData, playerSymbol:symbol}));
      }
    }) 

    return (
      <>
        <div>Table Id: <button onClick={()=>{copyToClipboard(id)}}>{id}</button></div>
        
        <span>Your Symbol: {generateMark(symbol)}</span>
        <div className="table">
          {table.copyTable().map((element, index) => (
            <button
              key={index}
              className="table__spot"
              disabled={!table.canPlay()}
              onClick={
                ()=> {
                  setTable((table) => {
                    try {
                      const newTable = table.mark(index)
                      tableDB.write(newTable.copyTable())
                      return newTable;
                    } catch (err) {
                      console.log(err)
                      return table
                    }
                  });
                }
              }
            >
              {generateMark(element)}
            </button>
          ))}
        </div>
        {winner &&
          <div>The winner is: {winner}</div>}
        <button
          onClick={() => {
            setTable(() => {
              tableDB.write(EmptyTable);
              return new TableState({table:EmptyTable, playerSymbol:symbol});
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