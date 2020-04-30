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
        <button
          onClick={() => {
            this.props.deleteNote(this.props.id);
            this.props.toggleDelete();
          }}
          className="green-text click"
        >
          Yes
        </button>
        <button onClick={() => this.props.toggleDelete()} className="click">
          No
        </button>
      </>
    );
  }
}

export default connect(null, { deleteNote })(NoteDelete);
