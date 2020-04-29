import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { updateNote } from "../../actions";
class NoteEdit extends Component {
  submitValues(values) {
    this.props.updateNote(this.props.id, values.content);
    this.props.setEditedContent(values.content)
    // this.setState({ editedContent: values.content });
    this.props.toggleEdit()
  }
  render() {
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
              value={this.props.editedContent || values.content}
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
  }
}

export default connect(null, { updateNote })(NoteEdit);
