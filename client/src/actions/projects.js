import axios from "axios";
import {
  FETCH_COMPLETED_PROJECTS,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "./types";

export const fetchProjects = () => async (dispatch) => {
  const response = await axios.get("/api/projects");
  dispatch({
    type: FETCH_PROJECTS,
    payload: response.data,
  });
};

export const fetchCompleteProjects = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/projects/done");
    dispatch({
      type: FETCH_COMPLETED_PROJECTS,
      payload: response.data,
    });
  } catch (error) {
    console.error("OOPS\n\n")
    console.error(error)
  }
};
export const fetchProject = (id) => async (dispatch) => {
  const response = await axios.get(`/api/projects/show/${id}`);
  dispatch({
    type: FETCH_PROJECTS,
    payload: response.data,
  });
};

export const createProject = (values) => async (dispatch) => {
  const response = await axios.post("/api/projects", values);
  dispatch({
    type: CREATE_PROJECT,
    payload: response.data,
  });
};

export const updateProject = (values) => async (dispatch) => {
  const response = await axios.patch("/api/projects", values);
  dispatch({
    type: UPDATE_PROJECT,
    payload: response.data,
  });
};

export const completeProject = (id) => async (dispatch) => {
  const response = await axios.patch("/api/projects/done", {projectId: id});
  dispatch({
    type: DELETE_PROJECT,
    payload: response.data._id,
  });
};

export const deleteProject = (projectId) => async (dispatch) => {
  const response = await axios.delete(`/api/projects/${projectId}`);
  dispatch({
    type: DELETE_PROJECT,
    payload: response.data,
  });
};