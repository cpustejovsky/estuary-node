import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import {Container} from "react-bootstrap"
import Default from "./Default";
import Header from "./Header";
import Footer from "./Footer";
import history from "../history";

function App() {
  return (
    <BrowserRouter history={history}>
      <Header />
      <div className="site">
        <main className="site__content">
          <Switch>
            <Route path="/" exact component={Default} />
            <Route path="/about" exact component={Default} />
            <Route path="/login" exact component={Default} />
            <Route path="/register" exact component={Default} />
            <Route path="/user" exact component={Default} />
            <Route path="/user/edit" exact component={Default} />
            <Route path="/free-writes" exact component={Default} />
            <Route path="/free-writes/new" exact component={Default} />
            <Route path="/notes" exact component={Default} />
            <Route path="/notes/new" exact component={Default} />
            <Route path="/notes/edit" exact component={Default} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
