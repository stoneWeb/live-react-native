import { combineReducers } from 'redux';
import nav from './nav';
import home from './home';

export default combineReducers({
  nav,
  home
});