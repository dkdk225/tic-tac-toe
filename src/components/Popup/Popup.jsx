import { useContext, useState, useEffect } from "react";
import "./Popup.css";
import { EventBusContext } from "../App/";

function Popup({ children, name, className }) {
  /**
   * @summary A component wrapper that provides popup functionality.
   * @prop name a unique string representing popup name
   */
  const [show, setShow] = useState(false);
  const eventBus = useContext(EventBusContext);
  console.log(eventBus)
  useEffect(() => {
    const openEvent = "open " + name;
    const closeEvent = "close " + name;
    eventBus.subscribe(openEvent, () => {
      setShow(true);
      eventBus.subscribe(closeEvent, () => {
        setShow(false);
      });
    });

    return () => {
      //remove the listeners at unmount
      eventBus.clear(openEvent);
      eventBus.clear(closeEvent);
    };
  }, []);

  return (
    <>
      {show && (
        <div className="popup-background">
          <div className={className ? `popup ${className}` : "popup"}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
