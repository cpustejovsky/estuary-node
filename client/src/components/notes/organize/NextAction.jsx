import React from "react";
import { Button } from "@material-ui/core";
export default function NextAction({
  show,
  toggleNextAction,
  toggleProjectNew,
  categorizeNote,
  toggleActionable,
  noteId,
}) {
  if (show) {
    return (
      <>
        <h2>Is this a next physical action or something larger (a project)?</h2>
        <Button
          onClick={() => {
            alert("so it's a next action, cool!")
            categorizeNote(noteId, "next");
            toggleNextAction()
            toggleActionable();
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
