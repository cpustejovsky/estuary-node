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
  renderNotes(selectedCategory) {
    if (!_.isEmpty(this.props.notes)) {
      return this.props.notes
        .reverse()
        .map(({ content, _id, tags, category }) => {
          if (category === selectedCategory) {
            return (
              <Note
                key={_id}
                history={this.props.history}
                id={_id}
                content={content}
                tags={tags}
                category={category}
              />
            );
          } else {
            return null;
          }
        });
    }
  }
  renderNotesLength(selectedCategory) {
    if (!_.isEmpty(this.props.notes)) {
      return this.props.notes.filter(e=>e.category === selectedCategory).length
    }
  }
  render() {
    console.log(this.renderNotes("test5"));
    console.log(this.renderNotesLength("test5"));
    //TODO: what is a good way to deal with auth redirects?
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <div className="center">
            <button className="btn-small">Inbox</button>
            <button className="btn-small">Projects</button>
            <button className="btn-small">Next</button>
            <button className="btn-small">3rd Party</button>
            <button className="btn-small">Maybe</button>
            <button className="btn-small">Done</button>
            <button className="btn-small">Reference</button>
          </div>
          <div>
            <h3 className="center">Inbox ({this.renderNotesLength("inbox")})</h3>
            <hr />
            <NotesNew history={this.props.history} />
            <ul className="notes">{this.renderNotes("inbox")}</ul>
          </div>
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
