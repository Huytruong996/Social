import { createContext, useReducer } from "react";
import AuthReducer from "./reducers/AuthReducer";
import TimelineReducer from "./reducers/TimelineReducer";
import MessengerReducer from "./reducers/MessengerReducer";
import {
  GlobalInitial,
  AUTH_INITIAL_STATE,
  TIMELINE_INITIAL_STATE,
  MESSENGER_INITIAL_STATE,
} from "./GlobalInitial";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [Authstate, AuthDispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);
  const [Timelinestate, TimelineDispatch] = useReducer(
    TimelineReducer,
    TIMELINE_INITIAL_STATE
  );
  const [Messengerstate, MessengerDispatch] = useReducer(
    MessengerReducer,
    MESSENGER_INITIAL_STATE
  );
  return (
    <GlobalContext.Provider
      value={{
        ...GlobalInitial,
        ...Authstate,
        AuthDispatch,
        ...Timelinestate,
        TimelineDispatch,
        ...Messengerstate,
        MessengerDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
