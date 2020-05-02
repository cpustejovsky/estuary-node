import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Auth from "./Auth";
import About from "./about/About";
import Landing from "./Landing";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import NotesShow from "./notes/NotesShow";
import NotesOrganize from "./notes/NotesOrganize";
import FreeWritesShow from "./freewrites/FreeWritesShow";
import Warning from "./partials/Warning";
import Test from "./Test";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Router history={history}>
        <Header />
        <Warning />
        <div className="site">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/about" exact component={About} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/free-writes" exact component={FreeWritesShow} />
            <Route path="/notes" exact component={NotesShow} />
            <Route path="/notes/organize" exact component={NotesOrganize} />
            <Route path="/user" exact component={UserShow} />
            <Route path="/user/edit" exact component={UserEdit} />
            <Route path="/test" exact component={Test} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps, { fetchUser })(App);
