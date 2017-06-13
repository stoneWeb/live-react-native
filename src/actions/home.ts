import {
    GET_HOME_LIST
} from '../constants/ActionTypes';
import { getLiveList } from '../configs/api';
import {
    IAction
} from '../Common/interface';
import {
    IFetchDate,
} from '../pages/HomeScreen/home';

export default {
     fetchLiveList: () => async (dispatch: any) => {
        let payload: IFetchDate | null = await getLiveList().catch(err => { console.log(err); });
        console.log(payload);
        
        if (!payload) {
            payload = { state: 0 };
        }
        dispatch({
            type: GET_HOME_LIST,
            payload
        });
    }
};