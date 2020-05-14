import React, { useState } from "react";
import ProjectDelete from "./ProjectDelete";
import ProjectNew from "./ProjectNew";
import { connect } from "react-redux";
import { completeProject } from "../../actions"
import Note from "../notes/Note";
// import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

function Project(props) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const toggleEdit = () => {
    setEditShow(!editShow);
    closeDeleteView();
  };

  const closeEditView = () => setEditShow(false);
  const closeDeleteView = () => setDeleteShow(false);
  const renderEdit = (editShow, id) => {
    if (editShow) {
      const project = {
        title: props.title,
        description: props.description,
        dueDate: props.dueDate,
        id: id,
      };
      return (
        <ProjectNew
          show
          edit={true}
          project={project}
          id={id}
          toggleEdit={toggleEdit}
        />
      );
    } else {
      return null;
    }
  };
  const toggleDelete = () => {
    setDeleteShow(!deleteShow);
    closeEditView();
  };

  const renderDelete = (deleteShow, id) => {
    if (deleteShow && id === props.id) {
      console.log(props.history)
      return (
        <ProjectDelete
          history={props.history}
          style={{ marginRight: "20px" }}
          id={props.id}
          toggleDelete={toggleDelete}
        />
      );
    } else {
      return null;
    }
  };
  const renderButtons = () => {
    if (props.complete !== null && props.complete !== undefined) {
      return null;
    } else {
      return (
        <>
          <Button onClick={() => toggleEdit()} className="click">
            Edit
          </Button>
          <Button onClick={() => toggleDelete()} className="click">
            Delete
          </Button>
          <Button onClick={() => {
            props.completeProject(props.id)
            props.history.push("/projects/list")
          }}>
            Done
          </Button>
        </>
      );
    }
  };
  const renderNotes = () => {
    return props.notes.map((note) => {
      return (
        <Note
          category={note.category}
          content={note.content}
          noteId={note._id}
          project
        />
      );
    });
  };
  const renderContent = () => {
    return (
      <>
        {" "}
        {/* <h2>{props.title}</h2> */}
        <p>{props.description}</p>
        <hr />
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(props.dueDate).toLocaleDateString()}
        </p>
      </>
    );
  };
  return (
    <Card raised key={props.id} className="margin-top padding-horizontal notes">
      <CardContent>
        <CardActions>{renderButtons()}</CardActions>
        {renderDelete(deleteShow, props.id)}
        {!editShow ? renderContent() : null}
        {renderEdit(editShow, props.id)}

        <hr />
        <h4>Notes</h4>
        {renderNotes()}
      </CardContent>
    </Card>
  );
}

export default connect(null, { completeProject})(Project);
