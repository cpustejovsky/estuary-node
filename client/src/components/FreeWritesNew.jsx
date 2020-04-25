import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { createFreeWrite } from "../actions";
class FreeWritesNew extends Component {
  submitValues(values) {
    let history = this.props.history;
    this.props.createFreeWrite(values, history);
  }
  render() {
    return (
      <div>
        <h3>Free Write</h3>
        <p>Enter any text that comes to mind.</p>
        <p>
          If you want to save something as a note, press
          <strong>Enter</strong> and then begin your note with
          <strong>#n</strong> or <strong>#N</strong>.
        </p>
        <p>
          When you're finished with your note, press <strong>Enter</strong>{" "}
          again and continue with your free-write.
        </p>
        <p>
          When done, press Submit and both your free-write and any notes you
          have taken will be saved.
        </p>{" "}
        <Formik
          initialValues={{
            title: new Date().toLocaleDateString(),
            content: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values)
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
              <div className="button button__freewrites">
                <h4 className="button__text__left">Create New Free Write</h4>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg"
                >
                  Save
                </button>
              </div>
              <div>
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </div>
              <div className="input-field">
                <textarea
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  class="textarea textarea__freewrites"
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

export default connect(mapStateToProps, { createFreeWrite })(FreeWritesNew);
