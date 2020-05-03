import React from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../actions";
import { Button, CardActions } from "@material-ui/core";
import { green, red, grey } from "@material-ui/core/colors";

function NoteDelete(props) {
  return (
    <>
      <CardActions>
        <Button disabled style={{ color: grey[500] }}>
          Are you sure?
        </Button>
      </CardActions>
      <CardActions>
        <Button
          style={{ color: green[500] }}
          onClick={() => {
            props.deleteNote(props.id);
            props.toggleDelete();
          }}
          className="click"
        >
          Yes
        </Button>
        <Button
          style={{ color: red[500] }}
          onClick={() => props.toggleDelete()}
          className="click"
        >
          No
        </Button>
      </CardActions>
    </>
  );
}

export default connect(null, { deleteNote })(NoteDelete);
