import { combineReducers} from 'redux'
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer'
import notesReducer from './notesReducer'
import userReducer from './userReducer'

export default combineReducers({
    notes: notesReducer,
    auth: authReducer,
    user: userReducer,
    form: reduxForm,
  });