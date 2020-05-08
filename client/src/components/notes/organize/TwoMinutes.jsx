import React from "react";
import { Button } from "@material-ui/core";

export default function TwoMinutes({
  show,
}) {
  if (show) {
    return (
      <>
        <h2>Will it take two minutes</h2>
        <Button onClick={() => alert("Then go do it!")}>Yes</Button>
        <Button
          onClick={() => {
            alert("then it's a project or needs to be delegated or deferred");
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