import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { updateNote } from "../../actions";
import { FormControl, Button, TextareaAutosize } from "@material-ui/core";

class NoteEdit extends Component {
  submitValues(values) {
    this.props.updateNote(this.props.id, values.content);
    this.props.setEditedContent(values.content);
    this.setState({ editedContent: values.content });
    this.props.toggleEdit();
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
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <FormControl onSubmit={handleSubmit}>
            <div>
                {" "}
                <TextareaAutosize
                  className="textarea textarea__notes"
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={this.props.editedContent || values.content}
                ></TextareaAutosize>
              <Button type="submit" disabled={isSubmitting}>
                Update
              </Button>
            </div>
          </FormControl>
        )}
      </Formik>
    );
  }
}

export default connect(null, { updateNote })(NoteEdit);
