require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/business';
import { Dispatch } from 'redux';
import { Stores } from '../reducers/type';

export interface LoadOrders {
    type: constants.RECEIVE_ORDERS;
    orders: object[];
}

export interface LoadPayinfo {
    type: constants.RECEIVE_PAYINFO;
    payinfo: object[];
}

export interface LoadPayinfoParams {
    uid     : string;
    page    ?: number;
    count   ?: number;
    callback?: (page: number) => void;
}

export type BusinessActions = LoadOrders | LoadPayinfo;

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
                console.log('res', res);
                dispatch({type: constants.RECEIVE_ORDERS, orders: res.result});
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
                console.log('res', res);
                dispatch({type: constants.RECEIVE_ORDERS, orders: res.result});
            } else {
                throw new Error('fetch callback error');
            }
        });
    } catch (err) {
        console.log('loadWaitConfirmOrders err');
    }
};

export const loadPayinfo = 
    ({uid, page = 0, count = 20, callback = (page: number) => {/**/}}: LoadPayinfoParams) => 
    (dispatch: Dispatch<BusinessActions>, state: () => Stores): void => {
    try {
        if (!uid) {
            throw new Error('uid');
        }
    } catch (err) {
        console.log('loadPayinfo param', err.message);
    }

    try {
        let data = state().business.payinfo;

        if (page === 0 && data.length > 0) {
            return;
        } else {
            fetch(`/user/pay_info/${uid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page    : page,
                    count   : count
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    console.log('res', res);
                    data = data.concat(res.result.data);
                    dispatch({type: constants.RECEIVE_PAYINFO, payinfo: data});
                    callback(page);
                } else {
                    throw new Error('fetch callback error');
                }
            });
        }
    } catch (err) {
        console.log('loadPayinfo err');
    }
};