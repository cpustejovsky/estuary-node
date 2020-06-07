import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Project from "./Project";
import Loader from "../partials/Loader";
import { fetchProject, fetchProjectNotes } from "../../actions";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";
function ProjectShow({ fetchProject, fetchProjectNotes, match, history }) {
  const project = useSelector((state) => state.projects[match.params.id]);
  const notes = useSelector((state) => Object.values(state.notes));
  useEffect(() => {
    fetchProject(match.params.id);
    fetchProjectNotes(match.params.id);
  }, []);
  if (project) {
    return (
      <div>
        <div className="button">
          <Button component={RouterLink} to="/projects/list">
            Back to Projects
          </Button>
        </div>
        <Project
          title={project.title}
          description={project.description}
          dueDate={project.dueDate}
          id={project._id}
          notes={notes}
          history={history}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default connect(null, { fetchProject, fetchProjectNotes })(ProjectShow);
