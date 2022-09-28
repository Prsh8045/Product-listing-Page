import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/store";
import React from "react";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Cart" component={Cart} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
