import { TableState, EmptyTable, GameSymbols } from "../../game-table";
import { useState, useContext } from "react";
import { Notification } from "../Notification";
import "./Game.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { EventBusContext } from "../App";
import { Omark, Xmark } from "./marks";

const generateMark = function (symbol) {
  //return a mark: a component to represent the symbol in gui
  return symbol === GameSymbols.O ? (
    <Omark></Omark>
  ) : symbol === GameSymbols.X ? (
    <Xmark></Xmark>
  ) : (
    " "
  );
};

const createGame = function ({ id, symbol, tableDB }) {
  return function Game(props) {
    const [table, setTable] = useState(
      new TableState({ table: EmptyTable, playerSymbol: symbol })
    );
    const winner = table.getWinner();
    const eventBus = useContext(EventBusContext);
    tableDB.listen((snapshot) => {
      const tableData = snapshot.val();
      //update the table if it has changed
      if (tableData.toString() !== table.toString()) {
        setTable(
          () => new TableState({ table: tableData, playerSymbol: symbol })
        );
      }
    });

    const copyToClipboard = async (value) => {
      try {
        await navigator.clipboard.writeText(value);
        eventBus.publish("notify clipboard", 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    return (
      <>
        <Notification name="clipboard" className="id-display__notification horizontal-center">
          <span>Copied to clipboard</span>
        </Notification>
        <div className="game relative horizontal-center">
          <div className="id-display">
            <h3 className="h3 inline id-display__h3">Table Id:</h3>
            <button
              className="button id-display__button"
              onClick={() => {
                copyToClipboard(id);
              }}
            >
              {id} <ContentCopyIcon></ContentCopyIcon>
            </button>
          </div>

          <h3 className="center-text h3 symbol-display">
            Your Symbol: <div className="symbol-display__symbol">{generateMark(symbol)}</div>
          </h3>
          <div className="table relative horizontal-center">
            {table.copyTable().map((element, index) => (
              <button
                key={index}
                className="table__spot button"
                disabled={!table.canPlay()}
                onClick={() => {
                  setTable((table) => {
                    try {
                      const newTable = table.mark(index);
                      tableDB.write(newTable.copyTable());
                      return newTable;
                    } catch (err) {
                      console.log(err);
                      return table;
                    }
                  });
                }}
              >
                {generateMark(element)}
              </button>
            ))}
          </div>
          {winner && <div>The winner is: {winner}</div>}
          <button
            className="button relative horizontal-center"
            onClick={() => {
              setTable(() => {
                tableDB.write(EmptyTable);
                return new TableState({
                  table: EmptyTable,
                  playerSymbol: symbol,
                });
              });
            }}
          >
            Ask for a replay
          </button>
        </div>
      </>
    );
  };
};

export default createGame;
