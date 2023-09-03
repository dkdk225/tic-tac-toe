import { useState, useContext, useEffect } from "react";
import { EventBusContext } from "../App";
import "./Notification.css"

function Notification({ children, name, className }) {
  const [show, setShow] = useState(false);
  const eventBus = useContext(EventBusContext);

  const notifyEvent = "notify " + name;
  
  useEffect(() => {
    eventBus.subscribe(notifyEvent, (timeout=1000) => {
      setShow(true);
      setTimeout(()=>{
        setShow(false)
      }, timeout)
    });

    return () => {
      //remove the listeners at unmount
      eventBus.clear(notifyEvent);
    };
  }, []);

  return (
    <>
      {
        show &&
        <div
          className={className ? `${className} notification` : "notification"}
        >
          {children}
        </div>
      }
    </>
  );
}

export default Notification;
