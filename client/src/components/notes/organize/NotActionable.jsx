import React from "react";
import { Button } from "@material-ui/core";

export default function NotActionable({
  show,
  noteId,
  categorizeNote,
  deleteNote,
  toggle,
}) {
  if (show) {
    return (
      <>
        <h2>Then what is it?</h2>
        <div>
          <Button
            onClick={() => {
              toggle.NotActionable();
              toggle.Calendar();
            }}
          >
            It's something I need to schedule
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              categorizeNote(noteId, "maybe");
              toggle.NotActionable();
              toggle.Actionable();
            }}
          >
            It's something I might want to look at later
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              categorizeNote(noteId, "reference");
              toggle.NotActionable();
              toggle.Actionable();
            }}
          >
            It's Reference Material
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              deleteNote(noteId);
              toggle.NotActionable();
              toggle.Actionable();
            }}
          >
            It's Trash
          </Button>
        </div>
      </>
    );
  } else {
    return null;
  }
}
