import {
    IUris
} from '../../Common/interface';

interface IListItem {
    key: string;
    hub: string;
    uri: IUris[];
}

export interface IHomeState {
    list: IListItem[];
    loading: boolean;
}

interface IPropsInterface {
    homeState: IHomeState;
    actions: any;
}