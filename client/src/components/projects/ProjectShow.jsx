import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Project from "./Project";
import Loader from "../partials/Loader";
import { fetchProject } from "../../actions";
function ProjectShow({ history, fetchProject, match }) {
  const project = useSelector((state) => state.projects);
  console.log(project)
  useEffect(() => {
    fetchProject(match.params.id);
  }, []);
  if (project) {
    return (
      <div>
        <h1>Projects</h1>
        <Project title={project.title} description={project.description} dueDate={project.dueDate} />
      </div>
    );
  } else {
    return <Loader/>
  }
}

export default connect(null, { fetchProject })(ProjectShow);
