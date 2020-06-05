import React, { useEffect, useSelector } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./partials/Header";
import Auth from "./Login";
import About from "./about/About";
import Landing from "./Landing";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import NotesShow from "./notes/NotesShow";
import NotesOrganize from "./notes/organize/NotesOrganize";
import FreeWritesShow from "./freewrites/FreeWritesShow";
import FreeWritesNew from "./freewrites/FreeWritesNew";
import Test from "./Test";
import ProjectShow from "./projects/ProjectShow";
import ProjectsShow from "./projects/ProjectsShow";
import ProjectNew from "./projects/ProjectNew";
import Timer from "./notes/organize/Timer";

function App({ fetchUser }) {
  // const user = useSelector((state) => state.user);
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Router history={history}>
      <div className="site">
      <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/test" exact component={Test} />
          <Route path="/timer" exact component={Timer} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Auth} />
          <Route path="/free-writes" exact component={FreeWritesShow} />
          <Route path="/free-writes/new" exact component={FreeWritesNew} />
          <Route path="/notes/organize" exact component={NotesOrganize} />
          <Route path="/notes/:name" exact component={NotesShow} />
          <Route path="/user" exact component={UserShow} />
          <Route path="/user/edit" exact component={UserEdit} />
          <Route
            path="/projects/list/"
            exact
            render={({match}) => <ProjectsShow done={false} history={history} match={match}/>}
          />
          <Route
            path="/projects/list/done"
            exact
            render={({match}) => <ProjectsShow done={true} history={history} match={match}/>}
          />
          <Route
            path="/projects/new"
            exact
            render={() => <ProjectNew show={true} history={history} />}
          />
          <Route path="/projects/show/:id" exact component={ProjectShow} />
        </Switch>
      </div>
    </Router>
  );
}

export default connect(null, { fetchUser })(App);
