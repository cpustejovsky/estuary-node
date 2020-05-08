import React from "react";
import { Button } from "@material-ui/core";

export default function Actionable({
  show,
  hideActionable,
  showNotActionable,
}) {
  if (show) {
    return (
      <>
        <h2>Is it actionable?</h2>
        <Button onClick={() => alert("Then go do it!")}>Yes</Button>
        <Button
          onClick={() => {
            hideActionable();
            showNotActionable();
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
