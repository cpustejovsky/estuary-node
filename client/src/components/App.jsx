import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./Header";
import Warning from "./Warning";
import Default from "./Default";
import Auth from "./Auth";
import UserShow from "./UserShow";
import UserEdit from "./UserEdit";
import NotesShow from "./NotesShow";
import NotesNew from "./NotesNew";
import FreeWritesShow from "./FreeWritesShow";
import FreeWritesNew from "./FreeWritesNew";
import Landing from "./Landing";
import About from "./About";
import Footer from "./Footer";

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
            <Route path="/free-writes/new" exact component={FreeWritesNew} />
            <Route path="/notes" exact component={NotesShow} />
            <Route path="/notes/new" exact component={NotesNew} />
            <Route path="/notes/edit" exact component={Default} />
            <Route path="/user" exact component={UserShow} />
            <Route path="/user/edit" exact component={UserEdit} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = ({auth, user}) => {
  return { auth, user };
};

export default connect(mapStateToProps, { fetchUser })(App);
