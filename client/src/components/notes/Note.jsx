import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { deleteNote, updateNote } from "../../actions";
class Note extends Component {
  state = {
    deleteShow: false,
    editShow: false,
    editedContent: "",
  };
  submitValues(values) {
    this.props.updateNote(this.props.id, values.content);
    this.setState({ editedContent: values.content });
    this.setState({ editShow: false });
  }
  toggleEdit() {
    this.setState({ editShow: !this.state.editShow });
  }
  renderEdit(editShow, id) {
    if (editShow && id === this.props.id) {
      return (
        <Formik
          initialValues={{ content: this.props.content }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              this.submitValues(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <textarea
                  // className="textarea__note"
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={this.state.editedContent || values.content}
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn orange"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </Formik>
      );
    } else {
      return null;
    }
  }
  toggleDelete() {
    this.setState({ deleteShow: !this.state.deleteShow });
  }
  renderDelete(deleteShow, id) {
    if (deleteShow && id === this.props.id) {
      return (
        <>
          <p>
            <strong>Are you sure?</strong>
          </p>
          <a
            onClick={() => {
              this.props.deleteNote(this.props.id, this.props.history);
              this.toggleDelete();
            }}
            className="green-text click"
          >
            Yes
          </a>
          <a onClick={() => this.toggleDelete()} className="click">
            No
          </a>
        </>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <div key={this.props.id} className="card darken-1">
          <div className="card-content">
            <p>
              {!this.state.editShow
                ? this.state.editedContent || this.props.content
                : null}
            </p>
            {this.renderEdit(this.state.editShow, this.props.id)}
          </div>
          <div className="card-action">
            <a onClick={() => this.toggleEdit()} className="click">
              Edit
            </a>
            <a onClick={() => this.toggleDelete()} className="red-text click">
              Delete
            </a>
            {this.renderDelete(this.state.deleteShow, this.props.id)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user, notes }) => {
  return { auth, user, notes };
};
export default connect(mapStateToProps, { deleteNote, updateNote })(Note);
