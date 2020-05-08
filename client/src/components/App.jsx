import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Auth from "./Login";
import About from "./about/About";
import Landing from "./Landing";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import NotesShow from "./notes/NotesShow";
import NotesOrganize from "./notes/NotesOrganize";
import NotesOrganizeTest from "./notes/NotesOrganizeTest";
import FreeWritesShow from "./freewrites/FreeWritesShow";
import FreeWritesNew from "./freewrites/FreeWritesNew";
import Warning from "./partials/Warning";
import Test from "./Test";
import ProjectShow from "./projects/ProjectShow";
import ProjectsShow from "./projects/ProjectsShow";
import ProjectNew from "./projects/ProjectNew";
import ProjectEdit from "./projects/ProjectEdit";

function App({ fetchUser }) {
  useEffect(() => {
    fetchUser();
  });
  return (
    <Router history={history}>
      <Header />
      <Warning />
      <div className="site">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/test" exact component={Test} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Auth} />
          <Route path="/free-writes" exact component={FreeWritesShow} />
          <Route path="/free-writes/new" exact component={FreeWritesNew} />
          <Route path="/notes" exact component={NotesShow} />
          <Route path="/notes/organize" exact component={NotesOrganizeTest} />
          <Route path="/user" exact component={UserShow} />
          <Route path="/user/edit" exact component={UserEdit} />
          <Route path="/projects/list" exact component={ProjectsShow} />
          <Route path="/projects/new" exact component={ProjectNew} />
          <Route path="/projects/show" exact component={ProjectShow} />
          <Route path="/projects/edit" exact component={ProjectEdit} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default connect(null, { fetchUser })(App);
