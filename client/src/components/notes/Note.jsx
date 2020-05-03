import React, { useState } from "react";
import NoteDelete from "./NoteDelete";
import NoteEdit from "./NoteEdit";
import { connect } from "react-redux";
import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

function Note(props) {
  const [deleteShow, setDeleteShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const toggleEdit = () => setEditShow(!editShow);
  const updateContent = (newContent) => setEditedContent(newContent);

  const closeEditView = () => setEditShow(false)
const renderEdit = (editShow, id) => {
    if (editShow && id === id) {
      return (
        <NoteEdit
          id={props.id}
          content={props.content}
          editedContent={editedContent}
          updateContent={updateContent}
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
      return (
        <>
          {" "}
          <Button onClick={() => props.categorizeNote(props.id, "next")}>
            next
          </Button>
          <Button onClick={() => props.categorizeNote(props.id, "waiting")}>
            waiting
          </Button>
          <Button onClick={() => props.categorizeNote(props.id, "maybe")}>
            maybe
          </Button>
          <Button onClick={() => props.categorizeNote(props.id, "reference")}>
            reference
          </Button>
        </>
      );
    } else if (props.category === "in-tray" || props.category === "reference") {
      return (
        <>
          <Button onClick={() => toggleEdit()} className="click">
            Edit
          </Button>
          <Button onClick={() => toggleDelete()} className="red-text click">
            Delete
          </Button>
        </>
      );
    } else if (props.category === "done") {
      return null;
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
  // console.log(props);
  return (
    <Card raised key={props.id} className="margin-top padding-horizontal">
      <CardContent>
        <p>{!editShow ? editedContent || props.content : null}</p>
        {renderEdit(editShow, props.id)}
      </CardContent>
      <CardActions>{renderButtons()}</CardActions>
      {renderDelete(deleteShow, props.id)}
    </Card>
  );
}

export default connect(null, { categorizeNote })(Note);
