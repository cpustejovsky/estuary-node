import React, { useState } from "react";
import NoteDelete from "./NoteDelete";
import NoteEdit from "./NoteEdit";
import { connect } from "react-redux";
import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

function Note(props) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const toggleEdit = () => setEditShow(!editShow);

  const closeEditView = () => setEditShow(false);
  const renderEdit = (editShow, id) => {
    if (editShow && id === props.id) {
      return (
        <NoteEdit
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
        <NoteDelete
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
    if (props.organize) return null;
    switch (props.category) {
      case "maybe" || "referense":
        return (
          <>
            <Button
              onClick={() => {
                props.categorizeNote(props.id, "in-tray");
              }}
              className="click"
            >
              Move to In-Tray
            </Button>
            <Button onClick={() => toggleEdit()} className="click">
              Edit
            </Button>
            <Button onClick={() => toggleDelete()} className="red-text click">
              Delete
            </Button>
          </>
        );
      case "done":
        return (
          <p>
            Completed on:{" "}
            {props.completedDate
              ? new Date(props.completedDate).toLocaleString()
              : "N/A"}
          </p>
        );
      default:
        return (
          <>
            <Button
              onClick={() => {
                props.categorizeNote(props.noteId, "done");
              }}
            >
              Complete
            </Button>
            <Button onClick={() => toggleEdit()} className="click">
              Edit
            </Button>
            <Button onClick={() => toggleDelete()}>Delete</Button>
          </>
        );
    }
  };
  return (
    <Card
      raised
      key={props.id}
      className="margin-top notes"
    >
      <CardContent>
        <p>{!editShow ? props.content : null}</p>
        {renderEdit(editShow, props.id)}
      </CardContent>
      <CardActions>{renderButtons()}</CardActions>
      {renderDelete(deleteShow, props.id)}
    </Card>
  );
}

export default connect(null, { categorizeNote })(Note);
