import React, { Component } from "react";
// import _ from "lodash";
import { Formik } from "formik";
import { connect } from "react-redux";
import { createNote } from "../../actions";
class NotesNew extends Component {
  submitValues(values) {
    let history = this.props.history;
    this.props.createNote(values, history);
  }
  render() {
    return (
      <div>
        <Formik
          initialValues={{ content: "" }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              this.submitValues(values);
              resetForm();
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
            <form
              onSubmit={handleSubmit}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            >
              <div className="button button__notes">
                <h5 className="button__text__left">Create New Note</h5>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg margin-top"
                >
                  Save
                </button>
              </div>
              <div className="input-field center">
                <textarea
                  className="textarea__notes"
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                ></textarea>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps, { createNote })(NotesNew);
