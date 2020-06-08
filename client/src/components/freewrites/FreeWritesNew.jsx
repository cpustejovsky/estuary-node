import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { createFreeWrite } from "../../actions";
import {
  FormControl,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";

function FreeWritesNew({history, createFreeWrite}) {
  const submitValues = (values) => {
    createFreeWrite(values, history);
  };
  return (
    <div className="site freewrites">
      <Typography variant="h3">Free Write</Typography>
      <p>Enter any text that comes to mind.</p>
      <p>
        If you want to save something as a note, press
        <strong>Enter</strong> and then begin your note with
        <strong>#n</strong> or <strong>#N</strong>.
      </p>
      <p>
        When you're finished with your note, press <strong>Enter</strong> again
        and continue with your free-write.
      </p>
      <p>
        When done, press Submit and both your free-write and any notes you have
        taken will be saved.
      </p>{" "}
      <Formik
        initialValues={{
          title: new Date().toLocaleDateString(),
          content: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            submitValues(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <FormControl fullWidth onSubmit={handleSubmit}>
            <div className="button button__free-writes">
              <Typography variant="h4" className="button__text__left">
                Create New Free Write
              </Typography>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Save
              </Button>
            </div>
            <TextField
              fullWidth
              label="Title"
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className="form"
            />
            <TextareaAutosize
              fullWidth
              aria-label="minimum height"
              rowsMin={25}
              className="textarea__freewrites"
              name="content"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
            ></TextareaAutosize>
          </FormControl>
        )}
      </Formik>
    </div>
  );
}

export default connect(null, { createFreeWrite })(FreeWritesNew);
