import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote, fetchNotes ,updateNote } from "../../actions";
class Note extends Component {
  state = {
    deleteShow: false,
    editShow: false,
  };
  toggleEdit() {
    this.setState({ editShow: !this.state.editShow });
  }
  renderEdit(editShow, id) {
    if (editShow && id === this.props.id) {
      return <p>Edit is still WIP</p>;
    } else {
      return null;
    }
  }
  toggleDelete() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }
  renderDelete(deleteShow, id) {
    if (deleteShow && id === this.props.id) {
      return (
        <>
          <p>
            <strong>Are you sure?</strong>
          </p>
          <a
            onClick={() => {
              this.props.deleteNote(this.props.id, this.props.history);
              this.toggleDelete();
            }}
            className="green-text"
          >
            Yes
          </a>
          <a onClick={() => this.toggleDelete()}>No</a>
        </>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <div key={this.props.id} className="card darken-1">
          <div className="card-content">
            <p>{this.props.content}</p>
          </div>
          <div className="card-action">
            <a onClick={() => this.toggleEdit()}>Edit</a>
            <a onClick={() => this.toggleDelete()} className="red-text">
              Delete
            </a>
            {this.renderEdit(this.state.editShow, this.props.id)}
            {this.renderDelete(this.state.deleteShow, this.props.id)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes };
};
export default connect(mapStateToProps, { deleteNote, fetchNotes })(Note);
