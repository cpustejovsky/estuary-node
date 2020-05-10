import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { createProject } from "../../actions";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
function NotesNew({ history, createProject }) {
  const submitValues = (values) => {
    console.log(values);
    // createProject(values, history);
  };

  const DatePickerField = ({ field, handleBlur, form, ...other }) => {
    const currentError = form.errors[field.name];

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          clearable
          disablePast
          name={field.name}
          value={field.value}
          format="MM/dd/yyyy"
          helperText={currentError}
          error={Boolean(currentError)}
          onError={(error) => {
            // handle as a side effect
            if (error !== currentError) {
              form.setFieldError(field.name, error);
            }
          }}
          // if you are using custom validation schema you probably want to pass `true` as third argument
          onChange={(date) => form.setFieldValue(field.name, date, false)}
          {...other}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          onBlur={handleBlur}
          label="Due Date"
          margin="normal"
        />
      </MuiPickersUtilsProvider>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{ title: "", description: "", dueDate: new Date() }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            submitValues(values);
            resetForm();
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          >
            <div className="input-field center">
              <h1>New Project</h1>
              <div className="margin-top">
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                />
              </div>{" "}
              <div className="margin-top">
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>{" "}
              <div className="margin-top">
                <Field name="date" component={DatePickerField} />
              </div>{" "}
              <div className="margin-top">
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create Project
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { createProject })(NotesNew);
