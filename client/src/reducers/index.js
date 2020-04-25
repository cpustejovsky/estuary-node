import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import notesReducer from "./notesReducer";
import freeWritesReducer from "./freeWritesReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  freeWrites: freeWritesReducer,
  notes: notesReducer,
  form: reduxForm,
});
