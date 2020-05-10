import axios from "axios";
import {
  FETCH_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  CATEGORIZE_NOTE,
} from "./types";

export const fetchNotes = () => async (dispatch) => {
  const response = await axios.get("/api/notes");
  dispatch({
    type: FETCH_NOTES,
    payload: response.data,
  });
};

export const createNote = (values) => async (dispatch) => {
  const response = await axios.post("/api/notes", values);
  dispatch({
    type: CREATE_NOTE,
    payload: response.data,
  });
};

export const updateNote = (noteId, content) => async (dispatch) => {
  const response = await axios.patch("/api/notes", { noteId, content });
  dispatch({
    type: UPDATE_NOTE,
    payload: response.data,
  });
};

export const deleteNote = (noteId) => async (dispatch) => {
  await axios.delete("/api/notes", { data: { noteId: noteId } });
  dispatch({
    type: DELETE_NOTE,
    payload: noteId,
  });
};

export const categorizeNote = (noteId, category) => async (dispatch) => {
  const response = await axios.patch(`/api/notes/${category}`, { noteId });
  dispatch({
    type: CATEGORIZE_NOTE,
    payload: response.data,
  });
};