import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import _ from "lodash";
import { fetchNotes } from "../../../actions";
import Note from "../Note";
import Actionable from "./Actionable";
import NotActionable from "./NotActionable";
import TwoMinutes from "./TwoMinutes";
import Timer from "./Timer";
function NotesOrganize({ fetchNotes, history }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  useEffect(() => {
    fetchNotes();
  }, []);
  const [actionableShow, setActionableShow] = useState(true);
  const [notActionableShow, setNotActionableShow] = useState(false);
  const [twoMinutesShow, setTwoMinutesShow] = useState(false);
  const [timerShow, setTimerShow] = useState(false);

  const hideActionable = () => setActionableShow(false);
  const showNotActionable = () => setNotActionableShow(true);
  const showTwoMinutes = () => setTwoMinutesShow(true);
  const hideTwoMinutes = () => setTwoMinutesShow(false);
  const showTimer = () => setTimerShow(true);
  const noteId = () => {
    if (!_.isEmpty(notes)) {
      return notes
        .reverse()
        .map(({ _id, category }) =>
          category === "in-tray" ? { id: _id } : null
        )[0].id;
    }
  };
  const renderNote = () => {
    if (!_.isEmpty(notes)) {
      let inTray = notes.reverse().map(({ content, _id, tags, category }) => {
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
      return inTray[0];
    }
  };
  console.log(noteId());
  return (
    <div>
      <h1>Organize Notes</h1>
      {renderNote()}
      <Actionable
        show={actionableShow}
        hideActionable={hideActionable}
        showNotActionable={showNotActionable}
        showTwoMinutes={showTwoMinutes}
      />
      <NotActionable show={notActionableShow} />
      <TwoMinutes
        show={twoMinutesShow}
        showTimer={showTimer}
        hideTwoMinutes={hideTwoMinutes}
      />
      <Timer show={timerShow} />
    </div>
  );
}

export default connect(null, { fetchNotes })(NotesOrganize);
