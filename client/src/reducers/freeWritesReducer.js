import { CREATE_FREEWRITE, FETCH_FREEWRITES } from "../actions/types";
import _ from "lodash";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FREEWRITES:
      return { ...state, ..._.mapKeys(action.payload, "_id") } || false;
    case CREATE_FREEWRITE:
      return { ...state, [action.payload._id]: action.payload } || false;
    //TODO: when you add in delete, make sure to check if value !== "CastError"
    default:
      return state;
  }
}
