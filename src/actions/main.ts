require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/main';
import { 
    Gashapons,
    BannerType,
} from '../types/componentTypes';
import { Dispatch } from 'redux';
// import config from '../config/index';

export interface LoadGashapons {
    type: constants.RECEIVE_MAIN_GAHSAPONS;
    gashapons: Gashapons;
}

export interface LoadBanners {
    type: constants.RECEIVE_MAIN_BANNERS;
    banners: BannerType[];
}

export type MainActions = LoadGashapons | LoadBanners;

export const loadGashapons = () => (dispatch: Dispatch<MainActions>) => {
    try {
        fetch('/machine')
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                dispatch({type: constants.RECEIVE_MAIN_GAHSAPONS, gashapons: res.result});
            } else {
                throw new Error('loadGashapons error');
            }
        });
    } catch (err) {
        console.log('loadGashapons err', err);
    }
};
    
export const loadBanners = () => (dispatch: Dispatch<MainActions>) => 
    fetch('/banner')
    .then(res => res.json())
    .then(res => {
        if (res.success === true) {
            dispatch({type: constants.RECEIVE_MAIN_BANNERS, banners: res.result});
        } else {
            throw new Error('loadBanners error');
        }
    });