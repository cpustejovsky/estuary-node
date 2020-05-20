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
    if (props.organize) {
      return null;
    } else if (props.project) {
      if (props.category === "done") {
        //TODO: style this better
        return <h4>COMPLETE</h4>;
      } else {
        return (
          <Button
            onClick={() => {
              props.categorizeNote(props.noteId, "done");
            }}
          >
            Done
          </Button>
        );
      }
    } else if (props.category === "maybe" || props.category === "reference") {
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
    } else if (props.category === "done") {
      return (
        <p>
          Completed on:{" "}
          {props.completedDate
            ? new Date(props.completedDate).toLocaleString()
            : "N/A"}
        </p>
      );
    } else {
      return (
        <>
          <Button onClick={() => toggleEdit()} className="click">
            Edit
          </Button>
          <Button onClick={() => props.categorizeNote(props.id, "done")}>
            Done
          </Button>
        </>
      );
    }
  };
  return (
    <Card
      raised
      key={props.id}
      className={
        props.project
          ? "margin-top padding-horizontal"
          : "margin-top padding-horizontal notes"
      }
    >
      <CardContent>
        {/* <p>
          <strong>{props.category}</strong>
        </p> */}
        <p>{!editShow ? props.content : null}</p>
        {renderEdit(editShow, props.id)}
      </CardContent>
      <CardActions>{renderButtons()}</CardActions>
      {renderDelete(deleteShow, props.id)}
    </Card>
  );
}

export default connect(null, { categorizeNote })(Note);
