require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/home';
import { Dispatch } from 'redux';
import { Gashapon, OrderCount } from '../types/componentTypes';
import { getAccessToken } from '../config/util';
import User from '../classes/user';
import { Stores } from '../reducers/type';
// import config from '../config/index';

export interface LoadUserData {
    type    : constants.RECEIVE_HOME_USERDATA;
    userdata: {};
}

export interface LoadCollectGashapons {
    type        : constants.RECEIVE_HOME_COLLECT;
    gashapons   : Array<any>;
}

export interface LoadCode {
    type: constants.RECEIVE_CODE;
    code: object[];
}

export interface LoadUserDataFromUuid {
    type    : constants.RECEIVE_HOME_USERDATA;
    userdata: {};
}

export interface LoadOrderCount {
    type    : constants.RECEIVE_OREDER_COUNT;
    count   : OrderCount;
}

export interface LoadProvinces {
    type: constants.RECEIVE_PROVINCES;
    provinces: {}[];
}

export interface LoadCities {
    type: constants.RECEIVE_CITIES;
    cities: {}[];
}

export interface LoadAreas {
    type: constants.RECEIVE_AREAS;
    areas: {}[];
}

export type HomeActions = 
    LoadUserData 
    | LoadCollectGashapons 
    | LoadCode
    | LoadUserDataFromUuid
    | LoadOrderCount
    | LoadProvinces
    | LoadCities
    | LoadAreas;

export const loadUserData = (userId: string) => (dispatch: Dispatch<HomeActions>): void => {
    if (!userId) {
        throw new Error('PARAM_ERROR');
    }
    try {
        fetch(`/home/${userId}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_HOME_USERDATA, userdata: res.result});
            } else {
                throw new Error('loadUserData res false');
            }
        });
    } catch (err) {
        console.log('loadUserData err', err);
    }
};

export const loadCollectGashapons = (machineIds: string[]) => (dispatch: Dispatch<HomeActions>): void => {
    if (!machineIds) {
        throw new Error('PARAM_ERROR');
    }

    try {
        const gashapons: Gashapon[] = [];
        const promise = machineIds.map((id: string) => {
            return fetch(`/machine/info/${id}`)
                    .then(res => res.json());
        });

        Promise
            .all(promise)
            .then(data => {
                data.map(item => {
                    if (item.success === true) {
                        gashapons.push(item.result);
                    } else {
                        throw new Error(`loadCollectGashapons error`);
                    }
                });
                dispatch({type: constants.RECEIVE_HOME_COLLECT, gashapons: gashapons});
            });

    } catch (err) {
        console.log('loadCollectGashapons err', err);
    }
};

export const loadCode = (phone: string) => (dispatch: Dispatch<HomeActions>): void => {
    try {
        if (!phone) {
            throw new Error('phone');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
    }
    try {
        fetch(`/code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_CODE, code: res.result});
            } else {
                throw new Error('FETCH_CODE_ERROR');
            }
        });
    } catch (err) {
        console.log('loadCode err', err);
    }
};

export const loadUserDataFromUuid = (callback?: (uid: string) => void) => (dispatch: Dispatch<HomeActions>): void => {

    try {
        const uuid = getAccessToken();
        if (!uuid) {
            throw new Error('uuid');
        } else {
            fetch(`/accesstoken/${uuid}`)
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    const user = User.getUser();

                    if (user.uid !== res.result._id) {
                        User.setUser({uid: res.result._id});
                    }
                    dispatch({type: constants.RECEIVE_HOME_USERDATA, userdata: res.result});
                    
                    if (!!callback) {
                        callback(res.result._id);
                    }
                } else {
                    throw new Error('通过uuid请求uid出错');
                }
            });
        }
    } catch (err) {
        console.log('dispatching userdata error', err);
    }
};

export const loadOrderCount = (uid: string) => (dispatch: Dispatch<HomeActions>): void => {
    try {
        if (!uid) {
            throw new Error('uid');
        } 
    } catch (err) {
        console.log('loadOrderCount', err);
    }

    try {
        fetch(`/product/orders/count/${uid}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_OREDER_COUNT, count: res.result});
            } else {
                throw new Error(res.message ? res.message : 'FETCH_ERROR');
            }
            
        });
    } catch (err) {
        console.log('loadOrderCount', err);
    }
};

export const loadProvinces = () => (dispatch: Dispatch<HomeActions>, state: () => Stores): void => {
    
    try {
        const data = state().home.provinces;

        if (data.length === 0) {
            fetch(`//net.huanmusic.com/gasha/provinces.json`)
            .then(res => res.json())
            .then(res => {
                dispatch({type: constants.RECEIVE_PROVINCES, provinces: res});
            });
        }
        
    } catch (err) {
        console.log('loadProvinces', err);
    }
};

export const loadCities = () => (dispatch: Dispatch<HomeActions>, state: () => Stores): void => {
    
    try {
        const data = state().home.cities;

        if (data.length === 0) {
            fetch(`//net.huanmusic.com/gasha/cities.json`)
            .then(res => res.json())
            .then(res => {
                dispatch({type: constants.RECEIVE_CITIES, cities: res});
            });
        }
        
    } catch (err) {
        console.log('loadCities', err);
    }
};

export const loadAreas = () => (dispatch: Dispatch<HomeActions>, state: () => Stores): void => {
    
    try {

        const data = state().home.areas;

        if (data.length === 0) {
            fetch(`//net.huanmusic.com/gasha/areas.json`)
            .then(res => res.json())
            .then(res => {
                dispatch({type: constants.RECEIVE_AREAS, areas: res});
            });
        }
        
    } catch (err) {
        console.log('loadAreas', err);
    }
};