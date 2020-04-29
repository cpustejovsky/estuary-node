import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchNotes } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note";
import NotesNew from "./NoteNew";

class NotesShow extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }
  renderNotes() {
    if (!_.isEmpty(this.props.notes)) {
      return this.props.notes.reverse().map(({ content, _id, tags, destination }) => {
        return (
          <Note
            key={_id}
            history={this.props.history}
            id={_id}
            content={content}
            tags={tags}
            destination={destination}
          />
        );
      });
    }
  }
  render() {
    console.log(this.props.notes);
    //TODO: what is a good way to deal with auth redirects?
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <div className="button button__notes">
            <h3 className="button__text__left">
              Your Notes ({this.props.notes.length})
            </h3>
          </div>
          <hr />
          <NotesNew history={this.props.history} />
          <ul className="notes">{this.renderNotes()}</ul>
        </div>
      );
    } else if (this.props.auth === null && this.props.user === null) {
      return <Loader />;
    } else if (!this.props.auth && !this.props.auth) {
      return <>{this.props.history.push("/auth")}</>;
    }
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes: Object.values(notes) };
};

export default connect(mapStateToProps, { fetchNotes })(NotesShow);
