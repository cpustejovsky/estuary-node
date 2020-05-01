import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchNotes } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note";
import NotesNew from "./NoteNew";
import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "@material-ui/core";

class NotesShow extends Component {
  state = {
    category: "in-tray",
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
          <ButtonGroup className="center">
            <Button variant="contained" color="primary" disableElevation
              onClick={() => this.changeCategory("in-tray")}
              className="btn-small orange darken-2"
            >
              In Tray
            </Button>
            <Button variant="contained" color="primary" disableElevation
              onClick={() => this.changeCategory("next")}
              className="btn-small orange darken-2"
            >
              Next
            </Button>
            <Button variant="contained" color="primary" disableElevation
              onClick={() => this.changeCategory("waiting")}
              className="btn-small orange darken-2"
            >
              Waiting
            </Button>
            <Button variant="contained" color="primary" disableElevation
              onClick={() => this.changeCategory("maybe")}
              className="btn-small orange darken-2"
            >
              Maybe
            </Button>
            <Button variant="contained" color="primary" disableElevation
              onClick={() => this.changeCategory("done")}
              className="btn-small orange darken-2"
            >
              Done
            </Button>
            <Button variant="contained" color="primary" disableElevation
              onClick={() => this.changeCategory("reference")}
              className="btn-small orange darken-2"
            >
              Reference
            </Button>
          </ButtonGroup>
          <div>
            <div className="button">
              {" "}
              <h3 className="center">
                {this.state.category} (
                {this.renderNotesLength(this.state.category)})
              </h3>
              {this.state.category === "in-tray" ? (
                <Button>
                  <Link to="/notes/organize">Organize</Link>
                </Button>
              ) : null}
            </div>
            <hr />
            {this.state.category === "in-tray" ? (
              <NotesNew history={this.props.history} />
            ) : null}
            {this.renderNotes(this.state.category)}
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
