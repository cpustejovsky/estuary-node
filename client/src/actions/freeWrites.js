import axios from "axios";
import {
  FETCH_FREEWRITES,
  CREATE_FREEWRITE,

} from "./types";

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