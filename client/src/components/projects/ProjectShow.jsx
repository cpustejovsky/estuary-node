import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Project from "./Project";
import Loader from "../partials/Loader";
import { fetchProject } from "../../actions";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
function ProjectShow({ fetchProject, match }) {
  const project = useSelector((state) => state.projects[match.params.id]);
  console.log(project);
  useEffect(() => {
    fetchProject(match.params.id);
  }, []);
  if (project) {
    return (
      <div>
        <div className="button">
          <h1>{project.title}</h1>
          <Button component={RouterLink} to="/projects/list">
            Back to Projects
          </Button>
        </div>
        <Project description={project.description} dueDate={project.dueDate} />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default connect(null, { fetchProject })(ProjectShow);
