import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchProjects } from "../../actions";
import _ from "lodash";
import Loader from "../partials/Loader";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardContent } from "@material-ui/core";

function ProjectsShow({ fetchProjects, history, done }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => Object.values(state.projects));
  console.log("hit this route");
  useEffect(() => {
    fetchProjects();
  }, []);
  console.log(projects);
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
    <h1>{done ? "Completed ": null}Projects</h1>
          <Button component={RouterLink} to="/projects/new">
            New Project
          </Button>
        </div>
        {renderProjects()}
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchProjects })(ProjectsShow);
