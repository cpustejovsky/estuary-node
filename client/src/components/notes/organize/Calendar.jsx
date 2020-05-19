import React from "react";
import { Formik, Field } from "formik";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//TODO: potential memory leak here because I'm unmounting and not cleaning up. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
function Calendar({
  id,
  show,
  note,
  deleteNote,
  history,
  toggleCalendar,
  toggleActionable,
}) {
  const submitValues = async (values) => {
    const response = await axios.post("/api/calendar", values);
    console.log(response);
    // deleteNote(note.id);
    // toggleCalendar();
    // toggleActionable();
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
            startDate: new Date(),
            endDate: new Date(),
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
                  <Field
                    name="startDate"
                    label={"Start Date"}
                    component={DatePickerField}
                  />
                </div>{" "}
                <div className="margin-top">
                  <Field
                    name="endDate"
                    label={"End Date"}
                    component={DatePickerField}
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
