import { combineReducers } from 'redux';
import contactFormReducer from './contactFormReducer';

export default combineReducers({
  contactForm: contactFormReducer
});
