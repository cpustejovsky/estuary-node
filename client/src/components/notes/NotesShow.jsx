import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchNotes } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note";
import NotesNew from "./NoteNew";

class NotesShow extends Component {
  state = {
    category: "inbox",
  };
  changeCategory = (newCategory) => {
    this.setState({ category: newCategory });
  };
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
      return this.props.notes.filter((e) => e.category === selectedCategory)
        .length;
    }
  }
  render() {
    //TODO: what is a good way to deal with auth redirects?
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <div className="center">
            <button
              onClick={() => this.changeCategory("inbox")}
              className="btn-small orange darken-2"
            >
              Inbox
            </button>
            <button
              onClick={() => this.changeCategory("next")}
              className="btn-small orange darken-2"
            >
              Next
            </button>
            <button
              onClick={() => this.changeCategory("inbox")}
              className="btn-small orange darken-2"
            >
              Projects
            </button>
            <button
              onClick={() => this.changeCategory("inbox")}
              className="btn-small orange darken-2"
            >
              Waiting
            </button>
            <button
              onClick={() => this.changeCategory("inbox")}
              className="btn-small orange darken-2"
            >
              Maybe
            </button>
            <button
              onClick={() => this.changeCategory("inbox")}
              className="btn-small orange darken-2"
            >
              Done
            </button>
            <button
              onClick={() => this.changeCategory("inbox")}
              className="btn-small orange darken-2"
            >
              Reference
            </button>
          </div>
          <div>
            <h3 className="center">
              {this.state.category} ({this.renderNotesLength(this.state.category)})
            </h3>
            <hr />
            <NotesNew history={this.props.history} />
            <ul className="notes">{this.renderNotes(this.state.category)}</ul>
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
