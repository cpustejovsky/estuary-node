import React, { Component } from "react";
// import _ from "lodash";
import { Formik } from "formik";
import { connect } from "react-redux";
import {updateUser} from "../actions"
class UserEdit extends Component {
  submitValues(values){
    let history = this.props.history
    this.props.updateUser(values, history)
  }
  render() {
    if (this.props.auth) {
      let updatedData = {
        firstName: this.props.auth.firstName,
        lastName: this.props.auth.lastName,
        emailAddress: this.props.auth.email,
        emailUpdates: this.props.auth.emailUpdates,
      };

      return (
        <div>
          <h3>Update User Profile</h3>
          <Formik
            initialValues={updatedData}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                this.submitValues(values)
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
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                </div>
                <div>
                  <label htmlFor="">Email Address</label>
                  <input
                    type="text"
                    name="emailAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.emailAddress}
                  />
                </div>
                <div>
                  <label htmlFor="email-updates">
                    <input
                      type="checkbox"
                      id="email-updates"
                      name="emailUpdates"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.emailUpdates}
                      checked={values.emailUpdates ? "checked" : ""}
                    />
                    <span>Daily Email Updates</span>
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-lg margin-top"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {updateUser})(UserEdit);
