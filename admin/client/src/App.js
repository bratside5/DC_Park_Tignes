import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Profile from "./views/Profile";
import Home from "./views/Home";

// styles
import "./App.css";

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return "loading";
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default App;
