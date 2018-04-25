require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/business';
// import { Gashapon } from '../types/componentTypes';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadOrders {
    type: constants.RECEIVE_ORDERS;
    orders: object[];
}

export interface LoadWaitConfirmOrders {
    
}

export interface LoadWaitOrders {
    
}

export type BusinessActions = LoadOrders;

export const loadOrders = (_id: string) => (dispatch: Dispatch<BusinessActions>): void => {
    if (!_id) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/product/orders/shipped/${_id}`)
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_ORDERS, orders: res.result});
            } else {
                throw new Error('fetch callback error');
            }
        });
    } catch (err) {
        console.log('loadOrders err', err);
    }
};

export const loadWaitConfirmOrders = (_id: string) => (dispatch: Dispatch<BusinessActions>): void => {
    if (!_id) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/product/orders/wait_confirm/${_id}`)
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            if (res.success === true) {
                console.log('res');
            } else {
                throw new Error('fetch callback error');
            }
        });
    } catch (err) {
        console.log('loadWaitConfirmOrders err');
    }
};

export const loadWaitOrders = (_id: string) => (dispatch: Dispatch<BusinessActions>): void => {
    if (!_id) {
        throw new Error('PARAM ERROR');
    }
    try {
        fetch(`/product/orders/wait/${_id}`)
        .then(res => res.json())
        .then(res => {
            console.log('res', res);
            if (res.success === true) {
                console.log('res');
            } else {
                throw new Error('fetch callback error');
            }
        });
    } catch (err) {
        console.log('loadWaitConfirmOrders err');
    }
};