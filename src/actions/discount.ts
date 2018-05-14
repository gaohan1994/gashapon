require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/discount';
import { Dispatch } from 'redux';
import { discount as discountType } from '../types/componentTypes';

export interface LoadDiscountData {
    type: constants.RECEIVE_DISCOUNT;
    data: object;
}

export interface LoadDiscount {
    type    : constants.RECEIVE_HOME_DISOUNT;
    discount: discountType[];
}

export type LoadDiscountDataParam = {
    id: string;
};

export interface LoadDiscounting {
    type        : constants.RECEIVE_HOME_DISCOUNTING;
    discounting : discountType[];
}

export type DiscountActions = 
    LoadDiscountData 
    | LoadDiscount
    | LoadDiscounting;

export const loadDiscount = (uid: string) => (dispatch: Dispatch<DiscountActions>): void => {
    try {
        if (!uid) {
            throw new Error('uid');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
    }

    try {
        fetch(`/my/discount_plan/success/${uid}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                console.log(res);
                dispatch({type: constants.RECEIVE_HOME_DISOUNT, discount: res.result});
            } else {
                throw new Error('ERROR_FETCH_DISCOUNT');
            }
        });
    } catch (err) {
        console.log('loadDiscount err', err);
    }
};

export const loadDiscounting = (uid: string) => (dispatch: Dispatch<DiscountActions>): void => {
    try {
        if (!uid) {
            throw new Error('uid');
        }
    } catch (err) {
        console.log(err.message ? err.message : '数据错误');
    }

    try {
        fetch(`/my/discount_plan/fail/${uid}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                console.log(res);
                dispatch({type: constants.RECEIVE_HOME_DISCOUNTING, discounting: res.result});
            } else {
                throw new Error('ERROR_FETCH_DISCOUNT');
            }
        });
    } catch (err) {
        console.log(err.message ? err.message : 'loadDiscounting fetch error');
    }
};

export const loadDiscountData = ({id}: LoadDiscountDataParam) => (dispatch: Dispatch<LoadDiscountData>): void => {
    try {
        if (!id) {
            throw new Error('ID错误');
        }
    } catch (err) {
        console.log('loadDiscountData', err.message ? err.message : '');
    }

    try {
        fetch(`/discount_plan/${id}`)
        .then(res => res.json())
        .then(res => {
            dispatch({type: constants.RECEIVE_DISCOUNT, data: res.result});
        });
    } catch (err) {
        console.log('loadDiscountData', err.message ? err.message : '');
    }
};