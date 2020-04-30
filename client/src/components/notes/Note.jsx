import React, { Component } from "react";
import NoteDelete from "./NoteDelete";
import NoteEdit from "./NoteEdit";
import { connect } from "react-redux";
import { categorizeNote } from "../../actions";
class Note extends Component {
  state = {
    deleteShow: false,
    editShow: false,
    editedContent: "",
  };
  setEditedContent = (editedContent) => {
    this.setState({ editedContent });
  };
  toggleEdit = () => {
    this.setState({ editShow: !this.state.editShow });
  };
  renderEdit(editShow, id) {
    if (editShow && id === this.props.id) {
      return (
        <NoteEdit
          id={this.props.id}
          content={this.props.content}
          editedContent={this.state.editedContent}
          setEditedContent={this.setEditedContent.bind(this)}
          toggleEdit={this.toggleEdit}
        />
      );
    } else {
      return null;
    }
  }
  toggleDelete = () => {
    this.setState({ deleteShow: !this.state.deleteShow });
  };
  renderDelete(deleteShow, id) {
    if (deleteShow && id === this.props.id) {
      return <NoteDelete id={this.props.id} toggleDelete={this.toggleDelete} />;
    } else {
      return null;
    }
  }
  renderButtons() {
    if (this.props.category === "in-tray") {
      return (
        <button onClick={() => this.toggleDelete()} className="red-text click">
          Delete
        </button>
      );
    } else {
      return <button onClick={()=>this.props.categorizeNote(this.props.id, "done")}>Done</button>;
    }
  }
  render() {
    console.log(this.props.category);
    return (
      <div>
        <div key={this.props.id} className="card darken-1">
          <div className="card-content">
            <p>
              {!this.state.editShow
                ? this.state.editedContent || this.props.content
                : null}
            </p>
            <p>
              <strong>{this.props.category}</strong>
            </p>

            {this.renderEdit(this.state.editShow, this.props.id)}
          </div>
          <div className="card-action">
            <button onClick={() => this.toggleEdit()} className="click">
              Edit
            </button>
            {this.renderButtons()}
            {this.renderDelete(this.state.deleteShow, this.props.id)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { categorizeNote })(Note);
