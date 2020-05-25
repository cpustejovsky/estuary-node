import React from "react";
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

  const user = useSelector((state) => state.user);
  console.log(user);
  const emailUpdateDefault = () => {
    if (user) {
      return user.emailUpdates ? true : false;
    }
  };
  const [checked, setChecked] = React.useState(emailUpdateDefault());
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

  if (user) {
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      onClick={handleClick}
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
