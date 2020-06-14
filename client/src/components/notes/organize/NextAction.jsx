import React from "react";
import { Button } from "@material-ui/core";
export default function NextAction({
  show,
  toggle
}) {
  if (show) {
    return (
      <>
        <h2>Is this a next physical action or something larger (a project)?</h2>
        <Button
          onClick={() => {
            toggle.NextAction()
            toggle.NoteForProject();
          }}
        >
          Next Action
        </Button>
        <Button
          onClick={() => {
            toggle.NextAction();
            toggle.ProjectNew();
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
