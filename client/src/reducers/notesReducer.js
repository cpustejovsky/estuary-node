import { CREATE_NOTE, FETCH_NOTES, DELETE_NOTE } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_NOTES:
      return action.payload || false;
    case CREATE_NOTE:
      return action.payload || false;
    case DELETE_NOTE:
      //TODO: best practice for delete reducer?
      return state;
    default:
      return state;
  }
}
