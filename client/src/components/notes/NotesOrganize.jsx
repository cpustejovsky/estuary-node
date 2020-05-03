import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import _ from "lodash";
import { fetchNotes } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

function NotesOrganize({ fetchNotes, history }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  useEffect(() => {
    fetchNotes();
  });
  const renderNotes = () => {
    if (!_.isEmpty(notes)) {
      return notes.reverse().map(({ content, _id, tags, category }) => {
        if (category === "in-tray") {
          return (
            <Note
              key={_id}
              history={history}
              id={_id}
              content={content}
              tags={tags}
              category={category}
              organize={true}
            />
          );
        } else {
          return null;
        }
      });
    }
  };
  if (auth || user) {
    return (
      <div>
        <div>
          <Typography
            align="center"
            variant="h4"
            className="button__text__left"
          >
            Organize Notes
          </Typography>
          <hr />
          {renderNotes()}
        </div>
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchNotes })(NotesOrganize);
