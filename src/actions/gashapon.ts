require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/gashapon';
import { 
    Gashapon
} from '../types/componentTypes';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadGashapon {
    type: constants.RECEIVE_GASHAPON;
    gashapon: Gashapon;
}

export interface ChangeLoading {
    type: constants.CHANGE_LOADING_STATUS;
    status: boolean;
}

export type GashaponActions = LoadGashapon | ChangeLoading;

export const loadGashapon = (_id: string) => (dispatch: Dispatch<GashaponActions>): void => {
    if (!_id) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/machine/info/${_id}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_GASHAPON, gashapon: res.result});
            } else {
                throw new Error('fetch callback error');
            }
        });
    } catch (err) {
        console.log('loadGashapon err', err);
    }
};

export const changeGashaponLoading = (status: boolean) => (dispatch: Dispatch<GashaponActions>): void => {
    try {
        dispatch({type: constants.CHANGE_LOADING_STATUS, status: status});
    } catch (err) {
        console.log('err', err);
    }
};