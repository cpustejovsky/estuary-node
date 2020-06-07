import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import _ from "lodash";
import { fetchNotesByCategory } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note";
import NotesNew from "./NoteNew";
import NotesSubNav from "./NotesSubNav";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
function NotesShow({ fetchNotesByCategory, history, match }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  const getNotesLength = (notes) => {
    return notes.length > 0
      ? notes.filter((note) => note.category === match.params.name).length
      : 0;
  };
  const notesLength = getNotesLength(notes);
  useEffect(() => {
    fetchNotesByCategory(match.params.name);
  }, [match.params.name, notesLength]);
  //TODO: create blur or loading effect while it's loading the other category
  const renderNotes = () => {
    if (!_.isEmpty(notes)) {
      return notes
        .reverse()
        .map(({ content, _id, tags, category, completedDate }) => {
          return (
            <Note
              key={_id}
              history={history}
              id={_id}
              content={content}
              tags={tags}
              category={category}
              completedDate={completedDate}
            />
          );
        });
    }
  };
  const renderNotesLength = () => {
    if (!_.isEmpty(notes)) {
      return notes.length;
    }
  };
  //TODO: what is a good way to deal with auth redirects?
  if (auth || user) {
    return (
      <div className="site">
        <NotesSubNav />
        <div className="button">
          <Typography variant="h6" className="button__text__left">
            {match.params.name.toUpperCase()} ({renderNotesLength() || 0})
          </Typography>
          {match.params.name === "in-tray" && renderNotesLength() > 0 ? (
            <Button
              component={RouterLink}
              to="/notes/organize"
              variant="contained"
              color="primary"
            >
              Organize
            </Button>
          ) : null}
        </div>
        <hr />
        {match.params.name === "in-tray" ? (
          <NotesNew history={history} />
        ) : null}
        {renderNotes()}
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchNotesByCategory })(NotesShow);
