import React, { Component } from "react";
// import _ from "lodash";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { categorizeNote } from "../../actions";
class NoteOrganize extends Component {
  submitValues(values) {
    console.log(values);
    // let history = this.props.history;
    // this.props.categorizeNote(values, history);
  }
  render() {
    return (
      <div>
        <Formik
          initialValues={{ category: "" }}
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
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  <input name="next" value="next" type="radio" />
                  <span>Next Actions</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="next" type="radio" />
                  <span>Waiting</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="next" type="radio" />
                  <span>Maybe</span>
                </label>
              </p>
              <p>
                <label>
                  <input value="next" type="radio" />
                  <span>Reference</span>
                </label>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-small"
              >
                Organize
              </button>
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

export default connect(mapStateToProps, { categorizeNote })(NoteOrganize);
