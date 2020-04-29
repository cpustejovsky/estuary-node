import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../actions";
class NoteDelete extends Component {
  render() {
    return (
      <>
        <p>
          <strong>Are you sure?</strong>
        </p>
        <a
          onClick={() => {
            this.props.deleteNote(this.props.id);
            this.props.toggleDelete();
          }}
          className="green-text click"
        >
          Yes
        </a>
        <a onClick={() => this.props.toggleDelete()} className="click">
          No
        </a>
      </>
    );
  }
}

export default connect(null, { deleteNote })(NoteDelete);
