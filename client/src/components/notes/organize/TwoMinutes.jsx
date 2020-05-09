import React from "react";
import { Button } from "@material-ui/core";
export default function TwoMinutes({
  show,
  toggleTimer,
  toggleTwoMinutes,
  categorizeNote,
  toggleActionable,
  noteId,
}) {
  if (show) {
    return (
      <>
        <h2>Will it take two minutes</h2>
        <Button
          onClick={() => {
            toggleTwoMinutes();
            toggleTimer();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            categorizeNote(noteId, "next");
            toggleTwoMinutes();
            toggleActionable();
          }}
        >
          No
        </Button>
      </>
    );
  } else {
    return null;
  }
}
