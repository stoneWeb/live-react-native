import * as types from '../constants/ActionTypes';
import {
    IAction
} from '../Common/interface';

import {
    IBroadcastLiveState,
} from '../pages/BroadcastLiveScreen/broadcastLive';

const initialState: IBroadcastLiveState = {
    streamUri: null,
    title: '',
    setting: {
      zoom: 1
    }
};

const changeSetting = (setting: any, type: string, data: any) => {
   switch (type) {
      case 'zoomIn':
        setting.zoom = Math.min(3, setting.zoom + 1);
        break;
      case 'zoomOut':
        setting.zoom = Math.max(1, setting.zoom - 1);
        break;
   }

   return setting;
};

export default function (state: IBroadcastLiveState = initialState, action: IAction) {
  const {payload, error, meta = {}, type} = action;
  let newState;
  
  switch (type) {
    case types.GENERATE_RTMP:
      newState = {
        ...state,
        streamUri: payload.data.url,
        title: payload.data.title
      };
      break;
    case types.CLOSE_LIVE:
      newState = {
        ...state,
        streamUri: null,
        title: ''
      };
      break;
    case types.SET_LIVE:
      const setType = meta.type;
      newState = {
        ...state,
        setting: changeSetting(state.setting, setType, payload)
      };
      break;
    default:
      newState = state;
  }
  return newState;
}