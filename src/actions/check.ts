require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/check';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadMonthCheck {
    type: constants.RECEIVE_MONTH_CHECK;
    checks: object[];
}

export interface LoadMonthCheckById {
    type: constants.RECEIVE_MONTH_CHECK;
    checks: object[];
}

export type CheckActions = LoadMonthCheck | LoadMonthCheckById;

export interface LoadMonthCheckByIdParam {
    _id: string;
}

export interface Reward {
    condition   : number;
    expire      : Date;
    pic         : string;
    price       : number;
    _id         : string;
}

export interface ChecksItem {
    day     : number;
    month   : number;
    year    : number;
    reward  : Reward;
    user    ?: string;
}

export interface Checks {
    accumulate_reward   : ChecksItem[];
    reward              : ChecksItem[];
}

export const loadMonthCheck = () => (dispatch: Dispatch<CheckActions>): void => {
    try {
        fetch(`/month/checkin`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
    } catch (err) {
        console.log('loadMonthCheck err', err);
    }
};

export const loadMonthCheckById = ({_id}: LoadMonthCheckByIdParam) => (dispatch: Dispatch<CheckActions>): void => {
    try {
        if (!_id) {
            throw new Error('_id');
        }
    } catch (err) {
        console.log('param err', err);
    }
    
    try {
        fetch(`/month/checkin/${_id}`)
        .then(res => res.json())
        .then(res => {
            dispatch({type: constants.RECEIVE_MONTH_CHECK, checks: res.result});
        });
    } catch (err) {
        console.log('loadMonthCheckById err', err);
    } 
};