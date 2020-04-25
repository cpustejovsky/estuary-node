import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../actions";

class NotesShow extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }
  renderNotes() {
    return this.props.notes.map(({ content, _id }) => {
      return (
        // <>
        //   <li key={_id}>{content}</li>
        // </>
        <div key={_id} className="card darken-1">
          <div className="card-content">
            <p>{content}</p>
          </div>

        </div>
      );
    });
  }
  render() {
    //TODO: what is a good way to deal with auth redirects?
    return (
      <div>
        <div className="button button__notes">
          <h4 className="button__text__left">Your Notes</h4>
          <Link to="notes/new" className="btn-large green">
            New Note
          </Link>
        </div>
        {/* <hr /> */}
        <ul className="notes">{this.renderNotes()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes };
};

export default connect(mapStateToProps, { fetchNotes })(NotesShow);
