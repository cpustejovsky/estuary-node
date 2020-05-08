import React from "react";
import { Button } from "@material-ui/core";

export default function NotActionable({
  show,
  noteId,
  categorizeNote,
  deleteNote,
  toggleActionable,
  toggleNotActionable,
}) {
  if (show) {
    return (
      <>
        {/* 
      TODO: delete notes when user clicks Trash
      TODO: send notes to maybe when user clicks Someday/Maybe
      TODO: send notes to reference when user clicks Reference
      */}
        <h2>Then what is it?</h2>
        <div>
          <Button
            onClick={() => {
              deleteNote(noteId);
              toggleActionable();
              toggleActionable();
            }}
          >
            It's Trash
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              categorizeNote(noteId, "maybe");
              toggleActionable();
              toggleActionable();
            }}
          >
            It's something I might want to look at later
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              categorizeNote(noteId, "reference");
              toggleActionable();
              toggleActionable();
            }}
          >
            It's Reference Material
          </Button>
        </div>
      </>
    );
  } else {
    return null;
  }
}
