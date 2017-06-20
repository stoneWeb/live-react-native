import {
    GET_HOME_LIST,
    GENERATE_RTMP,
    CLOSE_LIVE,
    SET_LIVE
} from '../constants/ActionTypes';
import { generateRtmp, getLiveList } from '../utils/api';
import {
    IAction
} from '../Common/interface';
import {
    IRGetLiveList,
    IRGenerateRtmp,
    IFetchDate,
    ICreateRtmp
} from '../utils/fetchInterface';

export default {
     fetchLiveList: (query: IRGetLiveList = {}) => async (dispatch: any) => {
        let payload: IFetchDate | undefined = await getLiveList().catch(err => { console.log(err); });
        
        if (!payload) {
            payload = { state: 0 };
        }
        dispatch({
            type: GET_HOME_LIST,
            payload
        });
    },
    fetchCreateRtmp: (data: IRGenerateRtmp) => async (dispatch: any) => {
        let payload: ICreateRtmp | undefined = await generateRtmp(data).catch(err => { console.log(err); });
        
        if (!payload) {
            payload = { state: 0 };
        }
        dispatch({
            type: GENERATE_RTMP,
            payload
        });
    },
    fetchCloseStream: (): IAction => ({
        type: CLOSE_LIVE
    }),
    setLiveCfg: (type: string, payload: any): IAction => ({
        type: SET_LIVE,
        meta: { type },
        payload
    })
};