import React, { Component } from "react";
import NoteDelete from "./NoteDelete";
import NoteEdit from "./NoteEdit";
import { connect } from "react-redux";
import { categorizeNote } from "../../actions";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";

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
    if (this.props.organize) {
      return (
        <>
          {" "}
          <Button
            onClick={() => this.props.categorizeNote(this.props.id, "next")}
          >
            next
          </Button>
          <Button
            onClick={() => this.props.categorizeNote(this.props.id, "waiting")}
          >
            waiting
          </Button>
          <Button
            onClick={() => this.props.categorizeNote(this.props.id, "maybe")}
          >
            maybe
          </Button>
          <Button
            onClick={() =>
              this.props.categorizeNote(this.props.id, "reference")
            }
          >
            reference
          </Button>
        </>
      );
    } else if (
      this.props.category === "in-tray" ||
      this.props.category === "reference"
    ) {
      return (
        <>
          <Button onClick={() => this.toggleEdit()} className="click">
            Edit
          </Button>
          <Button
            onClick={() => this.toggleDelete()}
            className="red-text click"
          >
            Delete
          </Button>
        </>
      );
    } else if (this.props.category === "done") {
      return null;
    } else {
      return (
        <>
          <Button onClick={() => this.toggleEdit()} className="click">
            Edit
          </Button>
          <Button
            onClick={() => this.props.categorizeNote(this.props.id, "done")}
          >
            Done
          </Button>
        </>
      );
    }
  }
  render() {
    console.log(this.props.category);
    return (
      <Card raised key={this.props.id} className="margin-top">
        <CardContent className="card-content">
          <p>
            {!this.state.editShow
              ? this.state.editedContent || this.props.content
              : null}
          </p>
          {this.renderEdit(this.state.editShow, this.props.id)}
        </CardContent>
        <CardActions className="card-action">
          {this.renderButtons()}
          {this.renderDelete(this.state.deleteShow, this.props.id)}
        </CardActions>
      </Card>
    );
  }
}

export default connect(null, { categorizeNote })(Note);
