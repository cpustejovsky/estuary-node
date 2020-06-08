import React from "react";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { createProject, updateProject } from "../../actions";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//TODO: potential memory leak here because I'm unmounting and not cleaning up. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
function ProjectNew({
  id,
  show,
  note,
  project,
  edit,
  deleteNote,
  history,
  createProject,
  toggleProjectNew,
  toggleActionable,
  updateProject,
  toggleEdit
}) {
  const submitValues = (values) => {
    if (edit) {
      values.projectId = id;
      updateProject(values);
      toggleEdit()
      return;
    }
    if (note) {
      createProject(values, history);
      deleteNote(note.id);
      toggleProjectNew();
      toggleActionable();
      return;
    } else {
      createProject(values, history);
      history.push("/projects/list");
    }
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
  const title = () => {
    if (note) {
      return note.content;
    } else if (project) {
      return project.title;
    } else {
      return "";
    }
  };
  if (show) {
    return (
      <div >
        <Formik
          initialValues={{
            title: title(),
            description: project ? project.description : "",
            dueDate: project ? new Date(project.dueDate) : new Date(),
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
                {project ? "" : <h1>New Project</h1>}
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
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {project ? "Update Project" : "Create Project"}
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

export default connect(null, { createProject, updateProject })(ProjectNew);
