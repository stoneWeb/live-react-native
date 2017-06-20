import { combineReducers } from 'redux';
import nav from './nav';
import home from './home';
import broadcastLive from './broadcastLive';

export default combineReducers({
  nav,
  home,
  broadcastLive
});