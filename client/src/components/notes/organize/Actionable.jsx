import React from "react";
import { Button } from "@material-ui/core";

export default function Actionable({
  show,
  hideActionable,
  showNotActionable,
  showTwoMinutes,
}) {
  if (show) {
    return (
      <>
        <h2>Is it actionable?</h2>
        <Button
          onClick={() => {
            hideActionable();
            showTwoMinutes();
          }}
        >
          Yes
        </Button>
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
