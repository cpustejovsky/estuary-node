import { CREATE_FREEWRITE, FETCH_FREEWRITES } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_FREEWRITES:
      return action.payload || false;
    case CREATE_FREEWRITE:
      return action.payload || false;
    default:
      return state;
  }
}
