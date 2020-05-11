import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetchProjects } from "../../../actions";
import _ from "lodash";
import { Link as RouterLink } from "react-router-dom";
import { Button, Card, CardContent } from "@material-ui/core";
function NextAction({
  show,
  toggleNoteForProject,
  categorizeNote,
  toggleActionable,
  noteId,
}) {
  const projects = useSelector((state) => Object.values(state.projects));
  useEffect(() => {
    fetchProjects();
  }, []);
  console.log(projects)
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
  if (show) {
    return (
      <>
        <h2>Is this a part of a project that already exists?</h2>
        <Button
          onClick={() => {
            alert("so it's a next action, cool!");
            categorizeNote(noteId, "next");
            toggleNoteForProject();
            toggleActionable();
          }}
        >
          Standalone Next Action
        </Button>
        <hr />
        <h3>List of Your Projects</h3>
        {renderProjects()}
      </>
    );
  } else {
    return null;
  }
}

export default connect(null, { fetchProjects })(NextAction);
