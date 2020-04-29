import {
  CREATE_NOTE,
  FETCH_NOTES,
  DELETE_NOTE,
  UPDATE_NOTE,
  CATEGORIZE_NOTE,
} from "../actions/types";
import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_NOTES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case CREATE_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case CATEGORIZE_NOTE:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_NOTE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
