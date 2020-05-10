import React from "react";
import { Formik } from "formik";
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

  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
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
              <div>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                />
              </div>{" "}
              <div>
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>{" "}
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Due Date"
                    format="MM/dd/yyyy"
                    // value={selectedDate}
                    onChange={handleChange}
                    name="dueDate"
                    onBlur={handleBlur}
                    value={values.dueDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>{" "}
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Create Project
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { createProject })(NotesNew);
