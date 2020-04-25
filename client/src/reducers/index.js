import { combineReducers} from 'redux'
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer'
import userReducer from './userReducer'

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    form: reduxForm,
  });