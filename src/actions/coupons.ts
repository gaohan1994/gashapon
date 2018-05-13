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
    type    ?: string;
    callback?: (page: number) => void;
}

export interface LoadingCouponsStatus {
    type: constants.LOADING_COUPONS_STATUS;
    loading: boolean;
}

export interface LoadLastType {
    type: constants.LAST_LOAD_COUPONS_TYPE;
    lastType: string;
}

export type CouponsActions = LoadCoupons | LoadingCouponsStatus | LoadLastType;

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

export const loadCouponsByType = 
    ({_id, type, page = 0, count = 20, callback = (page: number) => {/**/}}: LoadCouponsParams) => 
    (dispatch: Dispatch<CouponsActions>, state: () => Stores): void => {

    try {
        if (!_id) {
            throw new Error('_id');
        } else if (!type) {
            throw new Error('type');
        }
    } catch (err) {
        console.log(err.message ? err.message : 'loadCouponsByType err');
    }

    let 
        loadStatus  = state().coupons.loading,
        lastType    = state().coupons.lastType,
        data        = state().coupons.coupons;

    if (loadStatus === false) {
        try {

            const body = {
                page    : page,
                count   : count
            };

            if (lastType === type) {
                if (page === 0 && data.length > 0) {
                    return;
                } else {

                    dispatch({type: constants.LOADING_COUPONS_STATUS, loading: true});

                    fetch(`/discount/${type}/${_id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success === true) {

                            dispatch({type: constants.LOADING_COUPONS_STATUS, loading: false});
                            data = data.concat(res.result);
                            dispatch({type: constants.RECEIVE_COUPONS, coupons: data});
                            callback(page);
                        } else {
                            throw new Error('loadCouponsByType err');
                        }
                    });
                }
            } else {
                dispatch({type: constants.LAST_LOAD_COUPONS_TYPE, lastType: type});
                dispatch({type: constants.LOADING_COUPONS_STATUS, loading: true});

                fetch(`/discount/${type}/${_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {

                        dispatch({type: constants.LOADING_COUPONS_STATUS, loading: false});
                        dispatch({type: constants.RECEIVE_COUPONS, coupons: res.result});
                    } else {
                        throw new Error('loadCouponsByType err');
                    }
                });
            }
            
        } catch (err) {
            console.log(err.message ? err.message : 'loadCouponsByType err');
        }
    } else {
        return;
    }
};
