const host = 'http://Leis-MacBook-Pro.local:3000';
const ApiPath = host + '/api';
import {
    IHash
} from '../Common/interface';

const _fetch = (fetch_promise: Promise<any>, timeout = 15000) => {
    // fetch timeout
    return Promise.race([
         fetch_promise,
         new Promise((resolve, reject) => {
              setTimeout(() => reject({state: 0}), timeout);
         })
    ]);
};
const json2query = (args: any = {}) => {
    return Object.keys(args)
        .map(key => `${key}=${encodeURIComponent(args[key])}`)
        .join('&');
};

const createOptions = (method: string = 'GET', header: IHash = {}): {} => {
    let headers = new Headers(header);
    headers.append('Accept', 'application/json');
    
    return {
      method,
      headers,
      credentials: 'include',
      cache: 'default',
      mode: 'cors'
    };
};

interface IGetLiveList {
    liveonly?: boolean;
    prefix?: string;
    limit?: number;
    marker?: string;
}

export const getLiveList = (query: IGetLiveList = {}) => {
    query = json2query(query);
    let uri = `${ApiPath}/get_live_list`;
    if (query) {
        uri += '?' + query;
    }
    return _fetch(fetch(uri, createOptions()))
        .then(d => d.json());
};