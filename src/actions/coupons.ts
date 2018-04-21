require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/coupons';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadCoupons {
    type: constants.RECEIVE_COUPONS;
    coupons: object[];
}

export type CouponsActions = LoadCoupons;

export const loadCoupons = (userId: string) => (dispatch: Dispatch<CouponsActions>): void => {
    if (!userId) {
        throw new Error('userid错误');
    }
    try {
        fetch(`/discount/expire/${userId}`)
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_COUPONS, coupons: res.result});
            } else {
                throw new Error('loadCouponserr');
            }
        });
    } catch (err) {
        console.log('loadCoupons err');
    }
};