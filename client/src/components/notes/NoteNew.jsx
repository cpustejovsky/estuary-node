import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { createNote } from "../../actions";
import { TextareaAutosize } from "@material-ui/core";

function NotesNew({history, createNote}) {
  const submitValues = (values) => {
    createNote(values, history);
  };
  return (
    <div>
      <Formik
        initialValues={{ content: "" }}
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
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                placeholder="press enter to save"
                className="textarea__notes"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
              ></TextareaAutosize>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { createNote })(NotesNew);
