import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote, fetchNotes } from "../../actions";
class Note extends Component {
  state = {
    showDelete: false,
    showNote: true,
  };
  toggleDelete() {
    this.setState({ showDelete: !this.state.showDelete });
  }
  hideNote(){
    this.setState({showNote: false})
  }
  renderDelete(showDelete, id) {
    if (showDelete && id === this.props.id) {
      return (
        <>
          <p>
            <strong>Are you sure?</strong>
          </p>
          <a
            onClick={() => {
              this.props.deleteNote(this.props.id, this.props.history);
              this.hideNote()
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
    if (this.state.showNote) {
      return (
        <div>
          <div key={this.props.id} className="card darken-1">
            <div className="card-content">
              <p>{this.props.content}</p>
            </div>
            <div className="card-action">
              <a>Edit</a>
              <a onClick={() => this.toggleDelete()} className="red-text">
                Delete
              </a>
              {this.renderDelete(this.state.showDelete, this.props.id)}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes };
};
export default connect(mapStateToProps, { deleteNote, fetchNotes })(Note);
