import Transition from "react-transition-group/Transition";
import { ToastNotification } from "carbon-components-react";
export default function Notication({ notification, message, type }) {
  const duration = 300;

  const defaultStyle = {
    position: "fixed",
    top: "0",
    right: "-320px",
    zIndex: "1000",
  };

  const transitionStyles = {
    entered: {
      transform: "translateX(-100%)",
      transition: `transform ${duration}ms ease-in-out`,
    },
    exiting: {
      transform: "translateX(100%)",
      transition: `transform ${duration}ms ease-in-out`,
    },
  };
  return (
    <Transition in={notification} timeout={duration} unmountOnExit>
      {(state) => (
        <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <ToastNotification
            title={"Message !"}
            kind={type}
            subtitle={message}
            hideCloseButton
            caption={new Date().toString()}
          />
        </div>
      )}
    </Transition>
  );
}
