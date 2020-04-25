import { CREATE_NOTE, FETCH_NOTES } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload || false;
    case CREATE_NOTE:
      return action.payload || false;
    default:
      return state;
  }
}
