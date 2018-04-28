require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/discount';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadDiscountData {
    type: constants.RECEIVE_DISCOUNT;
    data: object;
}

export type LoadDiscountDataParam = {
    id: string;
};

export type DiscountActions = LoadDiscountData;

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