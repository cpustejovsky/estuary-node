import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import Default from "./Default";
import Auth from "./Auth";
import Landing from "./Landing";
import About from "./About";
import Footer from "./Footer";

function App() {
  return (
    <BrowserRouter history={history}>
      <Header />
      <div className="site">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Auth} />
          <Route path="/register" exact component={Auth} />
          <Route path="/user" exact component={Default} />
          <Route path="/user/edit" exact component={Default} />
          <Route path="/free-writes" exact component={Default} />
          <Route path="/free-writes/new" exact component={Default} />
          <Route path="/notes" exact component={Default} />
          <Route path="/notes/new" exact component={Default} />
          <Route path="/notes/edit" exact component={Default} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
