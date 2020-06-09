import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchProjects, fetchCompleteProjects } from "../../actions";
import _ from "lodash";
import Loader from "../partials/Loader";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Button,
  Card,
  CardContent,
  Typography,
  Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function ProjectsShow({
  fetchProjects,
  fetchCompleteProjects,
  history,
  done,
  match,
}) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => Object.values(state.projects));
  useEffect(() => {
    if (done) {
      fetchCompleteProjects();
    } else {
      fetchProjects();
    }
  }, [match.path, done]);
  console.log(projects);
  const renderProjects = () => {
    if (!_.isEmpty(projects)) {
      return projects
        .filter((project) => project !== 0)
        .map((project) => {
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
          <Typography variant="h4" className="button__text__left">
            {done ? "Completed " : null}Projects
          </Typography>
          {done ? null : (
            <Fab
              component={RouterLink}
              to="/projects/new"
              color="primary"
              size="medium"
            >
              <AddIcon />
            </Fab>
          )}
        </div>
        {renderProjects()}
        <div align="center">
          {done ? (
            // TODO: FIX THIS AND MAKE USEEFFECT WORK
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
