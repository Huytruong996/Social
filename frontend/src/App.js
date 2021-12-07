import "./App.scss";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { useContext, useRef } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { ProtectedRoute, RouteAuth } from "./Routes/ProtectedRoute";
import { useEffect } from "react";

import { useToasts } from "react-toast-notifications";
import socket from "./helpers/SocketInstance";

function App() {
  const { user, error, isFetching } = useContext(GlobalContext);
  const { addToast } = useToasts([]);

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
    }
  }, [error, addToast]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket;
  }, []);

  useEffect(() => {
    user && socketRef.current.emit("AddUsers", user?._id);
  }, [user]);
  return (
    <Router>
      <Switch>
        <RouteAuth
          exact
          path="/"
          component={<Home user={user} />}
          auth={user}
          isLoading={isFetching}
        />
        <Route path="/register">
          <Auth />
        </Route>
        <ProtectedRoute
          path="/profile/:id"
          component={<Profile />}
          auth={user}
        />
        <ProtectedRoute
          path="/messenger/:userId"
          component={<Messenger />}
          auth={user}
        />
        <ProtectedRoute
          path="/messenger"
          component={<Messenger />}
          auth={user}
        />
        <ProtectedRoute path="/:name" component={<Profile />} auth={user} />

        <Route exact path="/*" render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
