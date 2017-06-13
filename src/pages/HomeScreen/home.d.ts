import {
    IUris
} from '../../Common/interface';

interface IListItem {
    key: string;
    hub: string;
    uri: IUris[];
}

export interface IFetchDate {
    state: number;
    marker?: string | null;
    data?: IListItem[];
}

export interface IHomeState {
    list: IListItem[];
    loading: boolean;
}

interface IPropsInterface {
    homeState: IHomeState;
    actions: any;
}