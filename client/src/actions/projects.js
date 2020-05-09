import axios from "axios";
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "./types";

export const fetchNotes = () => async (dispatch) => {
  const response = await axios.get("/api/projects");
  dispatch({
    type: FETCH_PROJECTS,
    payload: response.data,
  });
};