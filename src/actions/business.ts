require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/business';
import { Dispatch } from 'redux';
import { Stores } from '../reducers/type';
import { Address } from '../types/user';
import { Gashapon } from '../types/componentTypes';

export interface LoadOrders {
    type: constants.RECEIVE_ORDERS;
    orders: object[];
}

export interface LoadPayinfo {
    type: constants.RECEIVE_PAYINFO;
    payinfo: object[];
}

export interface LoadIncomeRecord {
    type: constants.RECEIVE_INCOME_RECORD;
    income: object;
}

export interface LoadPayinfoParams {
    uid     : string;
    page    ?: number;
    count   ?: number;
    callback?: (page: number) => void;
}

export interface SetSelectedAddress {
    type: constants.SET_SELECTED_ADDRESS;
    address: Address | {};
}

export interface SetSelectedGashapons {
    type: constants.SET_SELECTED_GASHAPONS;
    gashapons: Gashapon[];
}

export type BusinessActions = 
    LoadOrders 
    | LoadPayinfo 
    | LoadIncomeRecord 
    | SetSelectedAddress
    | SetSelectedGashapons;

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

export const loadIncomeRecord = (_id: string) => (dispatch: Dispatch<BusinessActions>): void => {
    try {
        if (!_id) {
            throw new Error('_id');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
        return;
    }

    try {
        fetch(`/user/income_record/${_id}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_INCOME_RECORD, income: res});
            } else {
                throw new Error(res.message ? res.message : '请求收益错误');
            }
        });
    } catch (err) {
        console.log(err.message ? err.message : 'loadIncomeRecord错误');
    }
};

export const setSelectedAddress = (address: Address | {}) => (dispatch: Dispatch<BusinessActions>): void => {
    try {
        if (!address) {
            throw new Error('address');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
        return;
    }

    try {
        dispatch({type: constants.SET_SELECTED_ADDRESS, address: address});
    } catch (err) {
        console.log(err.message ? err.message : 'setSelectedAddress error');
    }
};

export const setSelectedGashapons = (gashapons: Gashapon[]) => (dispatch: Dispatch<BusinessActions>): void => {
    try {
        if (!gashapons) {
            throw new Error('gashapons');
        } else if (gashapons.length === 0) {
            throw new Error('gashapons');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
        return;
    }

    try {
        dispatch({type: constants.SET_SELECTED_GASHAPONS, gashapons: gashapons});
    } catch (err) {
        console.log(err.message ? err.message : 'setSelectedGashapons error');
    }
};