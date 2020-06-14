import React from "react";
import { Button } from "@material-ui/core";

export default function Actionable({ show, toggle }) {
  if (show) {
    return (
      <>
        <h2>Is it actionable?</h2>
        <Button
          onClick={() => {
            toggle.Actionable();
            toggle.TwoMinutes();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            toggle.Actionable();
            toggle.NotActionable();
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
