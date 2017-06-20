import {
    IListItem,
} from '../pages/HomeScreen/home';

import {
    IFatchCreateRtmp,
} from '../pages/BroadcastLiveScreen/broadcastLive';

export interface IRGetLiveList {
    liveonly?: boolean;
    prefix?: string;
    limit?: number;
    marker?: string;
}

export interface IRGenerateRtmp {
    streamkey: string;
    title?: string; 
}



interface ICommonProps {
    state: number;
}

export interface IFetchDate extends ICommonProps {
    marker?: string | null;
    data?: IListItem[];
}

export interface ICreateRtmp extends ICommonProps {
    data?: IFatchCreateRtmp
}