import * as types from '../constants/ActionTypes';
import {
    IAction
} from '../Common/interface';

import {
    IHomeState,
} from '../pages/HomeScreen/home';

const initialState: IHomeState = {
    list: [],
    loading: false
};
export default function (state: IHomeState = initialState, action: IAction) {
  const {payload, error, meta = {}, type} = action;
  let newState;
  
  switch (type) {
    case types.GET_HOME_LIST:
      newState = {
        ...state,
        list: payload.data || []
      };
      break;
    default:
      newState = state;
  }
  return newState;
}