import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Project from "./Project";
import Loader from "../partials/Loader";
import { fetchProject, fetchProjectNotes } from "../../actions";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
function ProjectShow({ fetchProject, fetchProjectNotes, match }) {
  const project = useSelector((state) => state.projects[match.params.id]);
  const notes = useSelector((state) => Object.values(state.notes));
  console.log(project);
  console.log(notes)
  useEffect(() => {
    console.log("this runs?")
    fetchProject(match.params.id);
    fetchProjectNotes(match.params.id);
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
        <Project title={project.title} description={project.description} dueDate={project.dueDate} notes={notes} />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default connect(null, { fetchProject, fetchProjectNotes })(ProjectShow);
