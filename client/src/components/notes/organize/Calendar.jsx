import React from "react";
import { Formik, Field } from "formik";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
//TODO: potential memory leak here because I'm unmounting and not cleaning up. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
function Calendar({
  id,
  show,
  note,
  deleteNote,
  history,
  toggle
}) {
  const submitValues = async (values) => {
    const response = await axios.post("/api/calendar", values);
    deleteNote(note.id);
    toggle.Calendar();
    toggle.Actionable();
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
          label="Date"
          margin="normal"
        />
      </MuiPickersUtilsProvider>
    );
  };
  const TimePickerField = ({ field, handleBlur, form, ...other }) => {
    const currentError = form.errors[field.name];

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          clearable
          disablePast
          name={field.name}
          value={field.value}
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
            "aria-label": "change time",
          }}
          onBlur={handleBlur}
          label={other.label}
          margin="normal"
        />
      </MuiPickersUtilsProvider>
    );
  };
  if (show) {
    return (
      <div>
        <Formik
          initialValues={{
            title: note.content,
            description: "",
            date: new Date(),
            startTime: new Date(),
            endTime: new Date(),
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              submitValues(values);
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
              <div className="input-field center">
                <h1>Add Event To Calendar</h1>
                <p>
                  <strong>
                    If you encounter an error, please email me at
                    charles@cpustejovsky.com.
                  </strong>
                </p>
                <div className="margin-top">
                  <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
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
                  <Field
                    name="startTime"
                    label={"Start Time"}
                    component={TimePickerField}
                  />
                </div>{" "}
                <div className="margin-top">
                  <Field
                    name="endTime"
                    label={"End Time"}
                    component={TimePickerField}
                  />
                </div>{" "}
                <div className="margin-top">
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Save Event
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  } else {
    return null;
  }
}

export default Calendar;
