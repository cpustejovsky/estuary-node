import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note"
import NotesNew from "./NotesNew"

class NotesShow extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }
  renderNotes() {
    if (this.props.notes) {
      return this.props.notes.map(({ content, _id }) => {
        return (
          <Note content={content} id={_id} history={this.props.history}/>
        );
      });
    }
  }
  render() {
    // console.log(this.props.notes);
    //TODO: what is a good way to deal with auth redirects?
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <div className="button button__notes">
            <h3 className="button__text__left">Your Notes</h3>
          </div>
          <hr/>
          <NotesNew history={this.props.history}/>
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
  return { auth, user, notes };
};

export default connect(mapStateToProps, { fetchNotes })(NotesShow);
