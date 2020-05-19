import React from "react";
import { Button } from "@material-ui/core";

export default function NotActionable({
  show,
  noteId,
  categorizeNote,
  deleteNote,
  toggleActionable,
  toggleNotActionable,
  toggleCalendar
}) {
  if (show) {
    return (
      <>
        <h2>Then what is it?</h2>
        <div>
          <Button
            onClick={() => {
              toggleNotActionable();
              toggleCalendar();
            }}
          >
            It's something I need to schedule
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              categorizeNote(noteId, "maybe");
              toggleNotActionable();
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
              toggleNotActionable();
              toggleActionable();
            }}
          >
            It's Reference Material
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              deleteNote(noteId);
              toggleNotActionable();
              toggleActionable();
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
