import React, { Component } from "react";
// import _ from "lodash";
import { Formik } from "formik";
import { connect, useSelector } from "react-redux";
import { updateUser } from "../../actions";
import {
  Button,
  Card,
  Checkbox,
  CardActions,
  FormControlLabel,
  Typography,
  TextField,
} from "@material-ui/core/";

const UserEdit = (props) => {
  const submitValues = (values) => {
    let history = props.history;
    props.updateUser(values, history);
  };

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [checked, setChecked] = React.useState(true);
  const handleClick = (event) => {
    setChecked(event.target.checked);
  };
  let updatedData;
  if (user) {
    updatedData = {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.email,
      emailUpdates: user.emailUpdates,
    };
  }
  if (auth) {
    updatedData = {
      firstName: auth.firstName,
      lastName: auth.lastName,
      emailAddress: auth.email,
      emailUpdates: auth.emailUpdates,
    };
  }

  if (auth) {
    return (
      <Card raised style={{ padding: "20px", minWidth: "33%" }}>
        <Typography align="center" gutterBottom variant="h4" component="h2">
          Update User Profile
        </Typography>
        <Formik
          initialValues={updatedData}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              submitValues(values);
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
                <TextField
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  fullWidth
                  label="First Name"
                  variant="outlined"
                />
              </div>
              <br />
              <div>
                <TextField
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                />
              </div>
              <br />
              <div>
                <TextField
                  type="email"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailAddress}
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                />
              </div>
              <div>
                {/* <label htmlFor="email-updates">
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
                  </label> */}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(handleChange)}
                      onClick={(handleClick)}
                      color="primary"
                      id="email-updates"
                      name="emailUpdates"
                      onBlur={handleBlur}
                      value={values.emailUpdates}
                    />
                  }
                  label="Daily Email Updates"
                />
              </div>
              <CardActions
                className="margin-top"
                style={{ justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </Card>
    );
  } else {
    return "Loading...";
  }
};

export default connect(null, { updateUser })(UserEdit);
