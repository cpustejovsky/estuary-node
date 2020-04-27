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
    console.log(this.props.history);
    return (
      <div>
        <Formik
          initialValues={{ content: "" }}
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
              <div className="button button__notes">
                <h4 className="button__text__left">Create New Note</h4>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg margin-top"
                >
                  Save
                </button>
              </div>
              <div className="input-field">
                <textarea
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
