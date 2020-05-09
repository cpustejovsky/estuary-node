import axios from "axios";
import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "./types";

export const fetchProjects = () => async (dispatch) => {
  const response = await axios.get("/api/projects");
  console.log(response);
  dispatch({
    type: FETCH_PROJECTS,
    payload: response.data,
  });
};

export const fetchProject = (id) => async (dispatch) => {
  const response = await axios.get(`/api/projects/show/${id}`);
  dispatch({
    type: FETCH_PROJECT,
    payload: response.data,
  });
};
