import React, { useState } from "react";
import ProjectDelete from "./ProjectDelete";
import ProjectEdit from "./ProjectEdit";
import { connect } from "react-redux";
import Note from "../notes/Note";
// import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

function Project(props) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const toggleEdit = () => setEditShow(!editShow);

  const closeEditView = () => setEditShow(false);
  const renderEdit = (editShow, id) => {
    if (editShow && id === id) {
      return (
        <ProjectEdit
          id={props.id}
          content={props.content}
          closeEditView={closeEditView}
        />
      );
    } else {
      return null;
    }
  };
  const toggleDelete = () => setDeleteShow(!deleteShow);

  const renderDelete = (deleteShow, id) => {
    if (deleteShow && id === props.id) {
      return (
        <ProjectDelete
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
          <Button onClick={() => alert("needs a done action creator")}>
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
        <h2>{props.title}</h2>
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

export default connect(null, {})(Project);
