import { CREATE_NOTE, FETCH_NOTES, DELETE_NOTE } from "../actions/types";
import _ from "lodash"
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload || false;
    case CREATE_NOTE:
      return [...state, action.payload] || false;
    case DELETE_NOTE:
      //TODO: best practice for delete reducer?
      return state.filter((n) => n._id !== action.payload);
    default:
      return state;
  }
}
