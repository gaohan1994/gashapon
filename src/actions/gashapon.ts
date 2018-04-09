require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/main';
import { 
    Gashapon
} from '../types/componentTypes';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadGashapon {
    type: constants.RECEIVE_GASHAPON;
    gashapon: Gashapon;
}

export type GashaponActions = LoadGashapon;

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
