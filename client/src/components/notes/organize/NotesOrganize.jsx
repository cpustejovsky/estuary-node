import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import _ from "lodash";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { fetchNotes, categorizeNote, deleteNote } from "../../../actions";
import Note from "../Note";
import Actionable from "./Actionable";
import NotActionable from "./NotActionable";
import TwoMinutes from "./TwoMinutes";
import Timer from "./Timer";
import Loader from "../../partials/Loader";

function NotesOrganize({ fetchNotes, deleteNote, categorizeNote, history }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  useEffect(() => {
    fetchNotes();
  }, []);
  const MapInTrayArray = () => {
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
  };
  const inTrayArray = MapInTrayArray();
  let noteId =
    inTrayArray && inTrayArray[0] !== undefined ? inTrayArray[0].id : null;
  const renderNote = () => {
    if (inTrayArray) {
      if (!_.isEmpty(inTrayArray)) {
        let inTray = inTrayArray.map((note) => {
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
        });
        return inTray[0];
      }
    }
  };
  const [actionableShow, setActionableShow] = useState(true);
  const [notActionableShow, setNotActionableShow] = useState(false);
  const [twoMinutesShow, setTwoMinutesShow] = useState(false);
  const [timerShow, setTimerShow] = useState(false);

  const toggleActionable = () => setActionableShow(!actionableShow);
  const toggleNotActionable = () => setNotActionableShow(!notActionableShow);
  const toggleTwoMinutes = () => setTwoMinutesShow(!twoMinutesShow);
  const toggleTimer = () => setTimerShow(!timerShow);

  if (auth || user) {
    if (inTrayArray && inTrayArray[0] !== undefined) {
      return (
        <div>
          <h1>Organize Notes</h1>
          {renderNote()}
          <Actionable
            show={actionableShow}
            toggleActionable={toggleActionable}
            toggleNotActionable={toggleNotActionable}
            toggleTwoMinutes={toggleTwoMinutes}
          />
          <NotActionable
            show={notActionableShow}
            categorizeNote={categorizeNote}
            deleteNote={deleteNote}
            noteId={noteId}
            toggleActionable={toggleActionable}
            toggleNotActionable={toggleNotActionable}
          />
          <TwoMinutes
            show={twoMinutesShow}
            toggleTimer={toggleTimer}
            toggleTwoMinutes={toggleTwoMinutes}
            toggleActionable={toggleActionable}
            categorizeNote={categorizeNote}
            noteId={noteId}
          />
          <Timer
            show={timerShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggleTimer={toggleTimer}
            toggleActionable={toggleActionable}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Congratulations!</h1>
          <h2>You're done organizing</h2>
          <Button component={RouterLink} to="/notes">
            Back to Notes
          </Button>
        </div>
      );
    }
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchNotes, deleteNote, categorizeNote })(
  NotesOrganize
);
