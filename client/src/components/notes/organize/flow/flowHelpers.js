import React from "react";
import Note from "../../Note";
import _ from "lodash";

export function mapInTrayArray(notes, history) {
  if (!_.isEmpty(notes)) {
    return notes
      .reverse()
      .map(({ content, _id, tags, category }) => {
        if (category === "in-tray") {
          return {
            id: _id,
            history,
            content,
            tags,
            category,
          };
        } else {
          return null;
        }
      })
      .filter((note) => note !== null);
  }
}

export function renderNote(noteArr) {
  if (noteArr) {
    if (!_.isEmpty(noteArr)) {
      return noteArr.map((note) => {
        if (note.category === "in-tray") {
          return (
            <Note
              key={note.id}
              history={note.history}
              id={note.id}
              content={note.content}
              tags={note.tags}
              category={note.category}
              organize={true}
            />
          );
        } else {
          return null;
        }
      })[0];
    }
  }
}
