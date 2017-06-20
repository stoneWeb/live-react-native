const host = 'http://localhost:3000';
const ApiPath = host + '/api';
import {
    IHash
} from '../Common/interface';

import {
    IRGetLiveList,
    IRGenerateRtmp
} from './fetchInterface';

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

const createOptions = (method: string = 'GET', body?: {}, header: IHash = {}): {} => {
    header = {...header,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let headers = new Headers(header);
    return {
      method,
      headers,
      body
    };
};

export const getLiveList = (query: IRGetLiveList = {}) => {
    query = json2query(query);
    let uri = `${ApiPath}/get_live_list`;
    if (query) {
        uri += '?' + query;
    }
    return _fetch(fetch(uri, createOptions()))
        .then(d => d.json());
};

export const generateRtmp = (data: IRGenerateRtmp) => 
    _fetch(fetch(`${ApiPath}/create_rtmp`, createOptions('POST', JSON.stringify(data))))
        .then(d => d.json());