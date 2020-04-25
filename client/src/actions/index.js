import axios from "axios";
import { FETCH_USER, UPDATE_USER, FETCH_NOTES, CREATE_NOTE, CREATE_FREEWRITE } from "./types";
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};
export const updateUser = (values, history) => async (dispatch) => {
  const response = await axios.put("/api/user", values)
  history.push("/user")
  dispatch({
    type: UPDATE_USER,
    payload: response.data,
  });
};
export const fetchNotes = (values) => async (dispatch) => {
  const response = await axios.get("/api/notes")
  dispatch({
    type: FETCH_NOTES,
    payload: response.data,
  });
};

export const createNote = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/notes", values)
  console.log(history)
  history.push("/notes")
  dispatch({
    type: CREATE_NOTE,
    payload: response.data.notes,
  });
};

export const createFreeWrite = (values, history) => async (dispatch) => {
  const response = await axios.post("/api/notes", values)
  console.log(history)
  history.push("/notes")
  dispatch({
    type: CREATE_FREEWRITE,
    payload: response.data,
  });
};

