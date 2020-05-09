import {
  CREATE_PROJECT,
  FETCH_PROJECTS,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  CATEGORIZE_PROJECT,
} from "../actions/types";
import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case CREATE_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    case CATEGORIZE_PROJECT:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_PROJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
