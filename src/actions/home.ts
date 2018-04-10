require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/home';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadUserData {
    type: constants.RECEIVE_HOME_USERDATA;
    userdata: {};
}

export type HomeActions = LoadUserData;

export const loadUserData = (userId: string) => (dispatch: Dispatch<HomeActions>): void => {
    if (!userId) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/home/${userId}`)
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            // if (res.success === true) {
            //     dispatch({type: constants.RECEIVE_HOME_USERDATA, inventory: res.result});
            // } else {
            //     throw new Error('loadUserData res false');
            // }
        });
    } catch (err) {
        console.log('loadUserData err', err);
    }
};
