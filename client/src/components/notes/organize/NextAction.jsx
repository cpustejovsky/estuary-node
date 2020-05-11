import React from "react";
import { Button } from "@material-ui/core";
export default function NextAction({
  show,
  toggleNextAction,
  toggleProjectNew,
  toggleNoteForProject,
}) {
  if (show) {
    return (
      <>
        <h2>Is this a next physical action or something larger (a project)?</h2>
        <Button
          onClick={() => {
            toggleNextAction()
            toggleNoteForProject();
          }}
        >
          Next Action
        </Button>
        <Button
          onClick={() => {
            toggleNextAction();
            toggleProjectNew();
          }}
        >
          Project
        </Button>
      </>
    );
  } else {
    return null;
  }
}
