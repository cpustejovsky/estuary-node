import axios from "axios";
import {
  FETCH_USER,
  UPDATE_USER,
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
