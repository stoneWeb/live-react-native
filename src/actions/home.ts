import {
    GET_HOME_LIST
} from '../constants/ActionTypes';
import { getLiveList } from '../utils/api';
import {
    IRGetLiveList
} from '../utils/fetchInterface';
import {
    IAction
} from '../Common/interface';
import {
    IFetchDate
} from '../utils/fetchInterface';

export default {
     fetchLiveList: (query?: IRGetLiveList) => async (dispatch: any) => {
        let payload: IFetchDate | undefined = await getLiveList(query).catch(err => { console.log(err); });
        
        if (!payload) {
            payload = { state: 0 };
        }
        dispatch({
            type: GET_HOME_LIST,
            payload
        });
    }
};