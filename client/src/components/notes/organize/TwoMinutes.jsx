import React from "react";
import { Button } from "@material-ui/core";
export default function TwoMinutes({
  show,
  toggleTimer,
  toggleTwoMinutes,
  toggleNextAction,
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
            toggleTwoMinutes();
            toggleNextAction();
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
