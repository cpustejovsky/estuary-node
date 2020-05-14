import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchProjects, fetchCompleteProjects } from "../../actions";
import _ from "lodash";
import Loader from "../partials/Loader";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button, Card, CardContent } from "@material-ui/core";


function ProjectsShow({ fetchProjects, fetchCompleteProjects, history, done, match }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => Object.values(state.projects));
  console.log(done)
  useEffect(() => {
    if (done) {
      fetchCompleteProjects();
    } else {
      fetchProjects();
    }
  }, [match.path, done]);
  const renderProjects = () => {
    if (!_.isEmpty(projects)) {
      return projects.map((project) => {
        return (
          <RouterLink to={`/projects/show/${project._id}`}>
            <Card
              raised
              key={project._id}
              className="margin-top padding-horizontal notes"
            >
              <CardContent>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </CardContent>
            </Card>
          </RouterLink>
        );
      });
    }
  };
  if (auth || user) {
    return (
      <div>
        <div className="button">
          <h1>{done ? "Completed " : null}Projects</h1>
          <Button component={RouterLink} to="/projects/new">
              New Project
            </Button>
        </div>
        {renderProjects()}
        <div align="center">
          {done ? (
            <Button component={Link} href="/projects/list" underlined="none">
              Back to Projects
            </Button>
          ) : (
            <Button component={RouterLink} to="/projects/list/done">
              View Completed Projects
            </Button>
          )}
        </div>
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchProjects, fetchCompleteProjects })(
  ProjectsShow
);
