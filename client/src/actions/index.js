import axios from "axios";
import {
  FETCH_USER,
  UPDATE_USER,
  FETCH_FREEWRITES,
  CREATE_FREEWRITE,
  FETCH_NOTES,
  CREATE_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  CATEGORIZE_NOTE,
} from "./types";
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};
export const updateUser = (values, history) => async (dispatch) => {
  const response = await axios.put("/api/user", values);
  history.push("/user");
  dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};

export const fetchFreeWrites = () => async (dispatch) => {
  const response = await axios.get("/api/free-writes");
  dispatch({
    type: FETCH_FREEWRITES,
    payload: response.data,
  });
};

export const createFreeWrite = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/free-writes", values);
  history.push("/free-writes");
  dispatch({
    type: CREATE_FREEWRITE,
    payload: response.data,
  });
};

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
