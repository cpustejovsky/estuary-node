import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchNotes } from "../../actions";
import { Link } from "react-router-dom";
import Loader from "../partials/Loader";
import Note from "./Note";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

class NotesOrganize extends Component {
  changeCategory = (newCategory) => {
    this.setState({ category: newCategory });
  };
  componentDidMount() {
    this.props.fetchNotes();
  }
  renderNotes() {
    if (!_.isEmpty(this.props.notes)) {
      return this.props.notes
        .reverse()
        .map(({ content, _id, tags, category }) => {
          if (category === "in-tray") {
            return (
              <Note
                key={_id}
                history={this.props.history}
                id={_id}
                content={content}
                tags={tags}
                category={category}
                organize={true}
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
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <div>
            <Typography align="center" variant="h4" className="button__text__left">
            Organize Notes
            </Typography>
            <hr />
            {this.renderNotes()}
          </div>
        </div>
      );
    } else if (this.props.auth === null && this.props.user === null) {
      return <Loader />;
    } else if (!this.props.auth && !this.props.auth) {
      return <>{this.props.history.push("/login")}</>;
    }
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes: Object.values(notes) };
};

export default connect(mapStateToProps, { fetchNotes })(NotesOrganize);
