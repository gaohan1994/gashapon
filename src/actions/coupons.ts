require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/coupons';
import { Dispatch } from 'redux';
import { Stores } from '../reducers/type';
// import config from '../config/index';

export interface LoadCoupons {
    type: constants.RECEIVE_COUPONS;
    coupons: object[];
}

export interface LoadCouponsParams {
    _id     : string;
    page    ?: number;
    count   ?: number;
    callback?: (page: number) => void;
}

export type CouponsActions = LoadCoupons;

export const loadCoupons = 
    ({_id, page = 0, count = 20, callback = () => {/**/}}: LoadCouponsParams) => 
    (dispatch: Dispatch<CouponsActions>, state: () => Stores): void => {

    try {
        if (!_id) {
            throw new Error('userid错误');
        }
    } catch (err) {
        console.log('loadCoupons err', err);
    }
    
    try {
        let data = state().coupons.coupons;

        if (page === 0 && data.length > 0) {
            return;
        } else {
            fetch(`/discount/expire/${_id}`, {
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
                    data = data.concat(res.result);
                    dispatch({type: constants.RECEIVE_COUPONS, coupons: data});
                } else {
                    throw new Error('loadCouponserr');
                }
            });
        }
    } catch (err) {
        console.log('loadCoupons err');
    }
};