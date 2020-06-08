import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { createNote } from "../../actions";
import { TextareaAutosize, Button } from "@material-ui/core";

function NotesNew({ history, createNote }) {
  const submitValues = (values) => {
    if (values.content.length > 0) {
      createNote(values, history);
    }
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
            className="notes"
          >
            <div className="input-field center" style={{ display: "flex"}}>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                placeholder="press enter to save"
                className="textarea textarea__notes"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
              ></TextareaAutosize>
            </div>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="primary"
              style={{borderRadius: "0px 0px 10px 10px"}}
              onClick={() => {
                handleSubmit();
              }}
            >
              New Note
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { createNote })(NotesNew);
