import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../actions";

class NotesShow extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }
  renderNotes() {
    return this.props.notes.map((note) => {
      return <li>{note.content}</li>;
    });
  }
  render() {
    console.log(this.props.notes);
    //TODO: is this a good way to deal with auth redirects?
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <h3>Your Notes</h3>
          <Link to="notes/new" className="btn-large green button">
            Create New Note
          </Link>
          <ul>{this.renderNotes()}</ul>
        </div>
      );
    } else {
      return <>{this.props.history.push("/auth")}</>;
    }
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes };
};

export default connect(mapStateToProps, { fetchNotes })(NotesShow);
