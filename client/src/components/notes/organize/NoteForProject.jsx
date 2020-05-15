import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { linkNoteToProject } from "../../../actions";
import { Button, Card, CardContent } from "@material-ui/core";
function NoteForProject({
  show,
  toggleNoteForProject,
  categorizeNote,
  toggleActionable,
  noteId,
  projects,
  linkNoteToProject,
}) {
  const selectProjectforNote = (noteId, projectId) => {
    linkNoteToProject(noteId, projectId);
    toggleNoteForProject();
    toggleActionable();
  };
  const renderProjects = () => {
    if (!_.isEmpty(projects)) {
      return projects.map((project) => {
        return (
          <Card
            onClick={() => selectProjectforNote(noteId, project._id)}
            raised
            key={project._id}
            className="margin-top padding-horizontal notes click"
          >
            <CardContent>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </CardContent>
          </Card>
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
export default connect(null, { linkNoteToProject })(NoteForProject);
