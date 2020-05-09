import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { updateNote } from "../../actions";
import { Button, TextareaAutosize } from "@material-ui/core";

function NoteEdit(props) {
  const submitValues = (values) => {
    props.updateNote(props.id, values.content);
    props.closeEditView();
  };

  return (
    <p>
      For the minute, this is WIP. will need to map over ProjectNew
      functionality with current values as those values; similar to Notes
    </p>
    // <Formik
    //   initialValues={{ content: props.content }}
    //   onSubmit={(values, { setSubmitting }) => {
    //     setTimeout(() => {
    //       submitValues(values);
    //       setSubmitting(false);
    //     }, 400);
    //   }}
    // >
    //   {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         {" "}
    //         <TextareaAutosize
    //           className="textarea textarea__notes"
    //           name="content"
    //           onChange={handleChange}
    //           onBlur={handleBlur}
    //           value={values.content}
    //         ></TextareaAutosize>
    //         <Button type="submit" disabled={isSubmitting}>
    //           Update
    //         </Button>
    //       </div>
    //     </form>
    //   )}
    // </Formik>
  );
}

export default connect(null, { updateNote })(NoteEdit);
