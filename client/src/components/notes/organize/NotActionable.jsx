import React from "react";
import { Button } from "@material-ui/core";

export default function NotActionable({ show }) {
  if (show) {
    return (
      <>
        <h2>Then what is it?</h2>
        <Button>Trash</Button>
        <Button>Someday/Maybe</Button>
        <Button>Reference</Button>
      </>
    );
  } else {
    return null;
  }
}
