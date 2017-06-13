
export interface IAction {
    type: string;
    payload?: any;
    error?: boolean;
    meta?: any;
}

export interface IHash {
  [key: string]: any;
}

export interface IUris {
  rtmp: string,
  hls: string,
  hdl: string,
  snapshot?: string
}