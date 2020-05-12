import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import _ from "lodash";
import { fetchNotesByCategory } from "../../actions";
import Loader from "../partials/Loader";
import Note from "./Note";
import NotesNew from "./NoteNew";
import { Link as RouterLink } from "react-router-dom";
import { ButtonGroup, Button, Typography } from "@material-ui/core";

function NotesShow({ fetchNotesByCategory, history, match }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  useEffect(() => {
    fetchNotesByCategory();
  }, []);
  console.log(match.params.name)
  console.log(notes)
  const [category, setCategory] = useState("in-tray");
  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const renderNotes = (selectedCategory) => {
    if (!_.isEmpty(notes)) {
      return notes.reverse().map(({ content, _id, tags, category }) => {
        if (category === selectedCategory) {
          return (
            <Note
              key={_id}
              history={history}
              id={_id}
              content={content}
              tags={tags}
              category={category}
            />
          );
        } else {
          return null;
        }
      });
    }
  };
  const renderNotesLength = (selectedCategory) => {
    if (!_.isEmpty(notes)) {
      return notes.filter((e) => e.category === selectedCategory).length;
    }
  };
  //TODO: what is a good way to deal with auth redirects?
  if (auth || user) {
    return (
      <div className="site__notes">
        <ButtonGroup variant="contained" color="primary">
          <Button
            onClick={() => changeCategory("in-tray")}
            className="btn-small orange darken-2"
          >
            In Tray
          </Button>
          <Button
            onClick={() => changeCategory("next")}
            className="btn-small orange darken-2"
          >
            Next
          </Button>
          {/* <Button

            onClick={() => changeCategory("waiting")}
            className="btn-small orange darken-2"
          >
            Waiting
          </Button> */}
          <Button
            onClick={() => changeCategory("maybe")}
            className="btn-small orange darken-2"
          >
            Maybe
          </Button>
          <Button
            onClick={() => changeCategory("done")}
            className="btn-small orange darken-2"
          >
            Done
          </Button>
          <Button
            onClick={() => changeCategory("reference")}
            className="btn-small orange darken-2"
          >
            Reference
          </Button>
        </ButtonGroup>

          <div className="button">
            <Typography variant="h6" className="button__text__left">
              {category.toUpperCase()} ({renderNotesLength(category) || 0})
            </Typography>
            {category === "in-tray" && renderNotesLength("in-tray") > 0 ? (
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
          {category === "in-tray" ? <NotesNew history={history} /> : null}
          {renderNotes(category)}
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchNotesByCategory })(NotesShow);
