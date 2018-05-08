require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/home';
import { Dispatch } from 'redux';
import { Gashapon } from '../types/componentTypes';
import { getAccessToken } from '../config/util';
import User from '../classes/user';
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

export type HomeActions = 
    LoadUserData 
    | LoadCollectGashapons 
    | LoadCode
    | LoadUserDataFromUuid;

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

export const loadUserDataFromUuid = () => (dispatch: Dispatch<HomeActions>): void => {
    try {
        if (!getAccessToken()) {
            throw new Error('uuid');
        } 
    } catch (err) {
        console.log('receiveUserdata', err);
    }

    try {
        const uuid = getAccessToken();

        fetch(`/accesstoken/${uuid}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {

                User.setUser({uid: res._id});
                
                dispatch({type: constants.RECEIVE_HOME_USERDATA, userdata: res.result});
            } else {
                throw new Error('通过uuid请求uid出错');
            }
        });
        
    } catch (err) {
        console.log('dispatching userdata error', err);
    }
};