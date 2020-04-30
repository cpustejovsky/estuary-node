import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../actions";
import { Button} from "@material-ui/core";

class NoteDelete extends Component {
  render() {
    return (
      <>
        <p>
          <strong>Are you sure?</strong>
        </p>
        <Button
          onClick={() => {
            this.props.deleteNote(this.props.id);
            this.props.toggleDelete();
          }}
          className="green-text click"
        >
          Yes
        </Button>
        <Button onClick={() => this.props.toggleDelete()} className="click">
          No
        </Button>
      </>
    );
  }
}

export default connect(null, { deleteNote })(NoteDelete);
