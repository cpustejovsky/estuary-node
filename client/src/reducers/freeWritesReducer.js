import { CREATE_FREEWRITE, FETCH_FREEWRITES } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_FREEWRITES:
      return action.payload || false;
    case CREATE_FREEWRITE:
      return action.payload || false;
    //TODO: when you add in delete, make sure to check if value !== "CastError"
    default:
      return state;
  }
}
