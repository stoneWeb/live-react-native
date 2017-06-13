import { NavigationActions, NavigationAction } from 'react-navigation';
import { AppNavigator } from '../navigators/Navigation';
import {
  LOGIN,
  LOGOUT,
  TABVIEW
} from '../constants/Navigation';

const tabAction = AppNavigator.router.getStateForAction(NavigationActions.reset({
  index: 0,
  actions: [
      NavigationActions.navigate({
      routeName: TABVIEW,
    }),
  ],
}));
const tempNavState = AppNavigator.router.getStateForAction(tabAction);

const initialNavState = AppNavigator.router.getStateForAction(
    tabAction,
    tempNavState
);

export default (state = initialNavState, action: any) => {
  let nextState;
  
  switch (action.type) {
    case LOGIN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case LOGOUT:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: LOGIN }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};