import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchProjects } from "../../actions";
import _ from "lodash";
import Loader from "../partials/Loader";

function ProjectsShow({ fetchProjects, history }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => Object.values(state.projects));
  useEffect(() => {
    fetchProjects();
  }, []);
  console.log(projects);
  const renderProjects = () => {
    if (!_.isEmpty(projects)) {
      return projects.map((project) => {
        return (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        );
      });
    }
  };
  if (auth || user) {
    return (
      <div>
        <h1>Projects</h1>
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
