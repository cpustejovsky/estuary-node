import React from "react";
import { Button } from "@material-ui/core";

export default function NotActionable({ show }) {
  if (show) {
    return (
      <>
      {/* 
      TODO: delete notes when user clicks Trash
      TODO: send notes to maybe when user clicks Someday/Maybe
      TODO: send notes to reference when user clicks Reference
      */}
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
