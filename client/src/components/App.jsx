import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions"
import history from "../history";
import Header from "./Header";
import Warning from "./Warning";
import Default from "./Default";
import Auth from "./Auth";
import Landing from "./Landing";
import About from "./About";
import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render(){
    return (
      <BrowserRouter history={history}>
        <Header />
        <Warning />
        <div className="site">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/about" exact component={About} />
            <Route path="/auth" exact component={Auth} />
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
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser })(App);