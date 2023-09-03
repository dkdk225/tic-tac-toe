import { useContext, useState, useEffect } from "react";
import "./Popup.css";
import { EventBusContext } from "../App/";
import CloseIcon from '@mui/icons-material/Close';

function Popup({ children, name, className }) {
  /**
   * @summary A component wrapper that provides popup functionality.
   * @prop name a unique string representing popup name
   */
  const [show, setShow] = useState(false);
  const eventBus = useContext(EventBusContext);

  const openEvent = "open " + name;
  const closeEvent = "close " + name;
  
  useEffect(() => {
    eventBus.subscribe(openEvent, () => {
      setShow(true);
    });
    eventBus.subscribe(closeEvent, () => {
      setShow(false);
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
          <div className={className ? `popup ${className}` : "popup"}>
            {children}
            <CloseIcon onClick={()=>{eventBus.publish(closeEvent)}} className="icon popup_close-icon">star</CloseIcon>
          </div>
      )}
    </>
  );
}

export default Popup;
