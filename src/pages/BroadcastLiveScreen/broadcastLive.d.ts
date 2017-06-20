import {
    IUris
} from '../../Common/interface';

export interface IBroadcastLiveState {
    streamUri: string | null;
    title: string;
    setting: any;
}

export interface IFatchCreateRtmp {
    url: string;
    title?: string;
}