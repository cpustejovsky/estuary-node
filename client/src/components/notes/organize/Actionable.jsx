import React from "react";
import { Button } from "@material-ui/core";

export default function Actionable({
  show,
  toggleActionable,
  toggleNotActionable,
  toggleTwoMinutes,
}) {
  if (show) {
    return (
      <>
        <h2>Is it actionable?</h2>
        <Button
          onClick={() => {
            toggleActionable();
            toggleTwoMinutes();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            toggleActionable();
            toggleNotActionable();
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
