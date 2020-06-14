import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  fetchNotesByCategory,
  categorizeNote,
  deleteNote,
  fetchProjects,
} from "../../../../actions";
import { mapInTrayArray, renderNote } from "./flowHelpers";
import Loader from "../../../partials/Loader";
import Actionable from "../Actionable";
import NotActionable from "../NotActionable";
import TwoMinutes from "../TwoMinutes";
import Timer from "../Timer";
import NextAction from "../NextAction";
import ProjectNew from "../../../projects/ProjectNew";
import NoteForProject from "../NoteForProject";
import Calendar from "../Calendar";
import {
  Grid,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  ButtonGroup,
} from "@material-ui/core";

function NotesOrganize({
  fetchNotesByCategory,
  fetchProjects,
  deleteNote,
  categorizeNote,
  history,
}) {
  const user = useSelector((state) => state.user);
  const notes = useSelector((state) => Object.values(state.notes));
  const projects = useSelector((state) => Object.values(state.projects));
  useEffect(() => {
    fetchNotesByCategory("in-tray");
    fetchProjects();
  }, []);

  const inTrayArray = mapInTrayArray(notes, history);
  let note =
    inTrayArray && inTrayArray[0] !== undefined ? inTrayArray[0] : null;
  let noteId = note && note !== null ? note.id : null;

  const [advanced, setAdvanced] = useState(null);
  const [actionableShow, setActionableShow] = useState(true);
  const [notActionableShow, setNotActionableShow] = useState(false);
  const [twoMinutesShow, setTwoMinutesShow] = useState(false);
  const [timerShow, setTimerShow] = useState(false);
  const [nextActionShow, setNextActionShow] = useState(false);
  const [projectNewShow, setProjectNewShow] = useState(false);
  const [noteForProjectShow, setNoteForProjectShow] = useState(false);
  const [calendarShow, setCalendarShow] = useState(false);

  const toggle = {
    Advanced() {
      if (advanced === null) {
        setAdvanced(!user.emailUpdates);
      } else {
        setAdvanced(!advanced);
      }
    },
    Actionable() {
      setActionableShow(!actionableShow);
    },
    NotActionable() {
      setNotActionableShow(!notActionableShow);
    },
    TwoMinutes() {
      setTwoMinutesShow(!twoMinutesShow);
    },
    Timer() {
      setTimerShow(!timerShow);
    },
    NextAction() {
      setNextActionShow(!nextActionShow);
    },
    ProjectNew() {
      setProjectNewShow(!projectNewShow);
    },
    NoteForProject() {
      setNoteForProjectShow(!noteForProjectShow);
    },
    Calendar() {
      setCalendarShow(!calendarShow);
    },
  };
  const renderOranizeFlow = () => {
    if (advanced === null ? user.emailUpdates : advanced) {
      return (
        <Grid>
          <ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={() => categorizeNote(note.id, "next")}
            >
              Next Action
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                toggle = { toggle };
                setProjectNewShow(false);
                setNoteForProjectShow(false);
              }}
            >
              Two Minutes
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                toggle = { toggle };
                setNoteForProjectShow(false);
                setTimerShow(false);
              }}
            >
              Project
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                toggle = { toggle };
                setProjectNewShow(false);
                setTimerShow(false);
              }}
            >
              Part of Project
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => categorizeNote(note.id, "waiting")}
            >
              Waiting
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => categorizeNote(note.id, "reference")}
            >
              Reference
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={() => deleteNote(note.id)}
            >
              Trash
            </Button>
          </ButtonGroup>
          <Grid>
            <Timer
              show={timerShow}
              categorizeNote={categorizeNote}
              noteId={noteId}
              toggle={toggle}
            />
            <ProjectNew
              show={projectNewShow}
              deleteNote={deleteNote}
              note={note}
              toggle={toggle}
            />
            <NoteForProject
              projects={projects}
              show={noteForProjectShow}
              categorizeNote={categorizeNote}
              noteId={noteId}
              toggle={toggle}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <>
          <Actionable show={actionableShow} toggle={toggle} />
          <NotActionable
            show={notActionableShow}
            categorizeNote={categorizeNote}
            deleteNote={deleteNote}
            noteId={noteId}
            toggle={toggle}
          />
          <Calendar
            show={calendarShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            note={note}
            deleteNote={deleteNote}
            toggle={toggle}
          />
          <TwoMinutes
            show={twoMinutesShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggle={toggle}
          />
          <Timer
            show={timerShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggle={toggle}
          />
          <NextAction show={nextActionShow} toggle={toggle} />
          <ProjectNew
            show={projectNewShow}
            deleteNote={deleteNote}
            note={note}
            toggle={toggle}
          />
          <NoteForProject
            projects={projects}
            show={noteForProjectShow}
            categorizeNote={categorizeNote}
            noteId={noteId}
            toggle={toggle}
          />
        </>
      );
    }
  };
  if (user) {
    if (inTrayArray && inTrayArray[0] !== undefined) {
      return (
        <Grid
          justify="center"
          align="center"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "20px",
            minHeight: "100vh",
            minWidth: "50vw",
          }}
        >
          <Typography variant="h4" align="center">
            Organize Notes
          </Typography>{" "}
          <FormControlLabel
            style={{
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
            }}
            control={
              <Switch
                size="small"
                color="primary"
                checked={advanced === null ? user.emailUpdates : advanced}
                onChange={() => {
                  toggle.Advanced();
                  setProjectNewShow(false);
                  setNoteForProjectShow(false);
                  setTimerShow(false);
                }}
              />
            }
            label={"Advanced View"}
          />
          {renderNote(inTrayArray)}
          {renderOranizeFlow()}
        </Grid>
      );
    } else {
      return (
        <div>
          <h1>Congratulations!</h1>
          <h2>You're done organizing</h2>
          <Button component={RouterLink} to="/notes/in-tray">
            Back to Notes
          </Button>
        </div>
      );
    }
  } else if (user === null) {
    return <Loader />;
  } else if (!user) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, {
  fetchNotesByCategory,
  deleteNote,
  categorizeNote,
  fetchProjects,
})(NotesOrganize);
